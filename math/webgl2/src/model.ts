import { Buffer } from "./buffer";
import { ShaderBundle } from "./types";

export class Model {
  gl: WebGL2RenderingContext;
  vs: ShaderBundle;
  fs: ShaderBundle;
  positionAttributeName: string;
  buf: Buffer;

  constructor(
    gl: WebGL2RenderingContext,
    vertexBundle: ShaderBundle,
    fragmentBundle: ShaderBundle,
    positionAttributeName: string,
    buf: Buffer,
  ) {
    this.gl = gl;
    if (!vertexBundle.source.includes(positionAttributeName)) {
      throw new Error(
        `Could not find ${positionAttributeName} in vertex shader source`,
      );
    }
    this.positionAttributeName = positionAttributeName;
    vertexBundle.shader = this.createShader(
      gl.VERTEX_SHADER,
      vertexBundle.source,
    );
    fragmentBundle.shader = this.createShader(
      gl.FRAGMENT_SHADER,
      fragmentBundle.source,
    );
    this.vs = vertexBundle;
    this.fs = fragmentBundle;
    this.buf = buf;
  }

  createShader(type: number, source: string): WebGLShader | null {
    let shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  getPositionIndex(program: WebGLProgram): GLuint {
    this.updateShaderBundleIdxMap(this.gl, program, this.vs);
    return this.vs.attributeMap.get(this.positionAttributeName);
  }

  updateShaderBundleIdxMap(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    bundle: ShaderBundle,
  ) {
    if (bundle.attributeMap) {
      for (let key of bundle.attributeMap.keys()) {
        bundle.attributeMap.set(key, gl.getAttribLocation(program, key));
      }
    }
    if (bundle.uniformMap) {
      for (let key of bundle.uniformMap.keys()) {
        bundle.uniformMap.set(key, gl.getUniformLocation(program, key));
      }
    }
  }

  updateShaderBundleIdxMaps(program: WebGLProgram) {
    this.updateShaderBundleIdxMap(this.gl, program, this.vs);
    this.updateShaderBundleIdxMap(this.gl, program, this.fs);
  }
}
