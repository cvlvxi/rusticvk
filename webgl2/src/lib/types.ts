import * as model from "./model";

export interface AttributeDescription {
  location?: GLuint;
  size: number;
  type: GLenum;
  normalize: boolean;
  stride: number;
  offset: number;
  buf: model.Buffer;
}

export type AttributeIdxMap = Map<string, AttributeDescription>;
export type UniformMap = Map<string, UniformDescription>;

export interface UniformDescription {
  location?: WebGLUniformLocation;
  transpose?: boolean;
  func: Function;
  matrix: boolean;
}

export interface ShaderBundle {
  shader?: WebGLShader;
  source: string;
  attributeMap?: AttributeIdxMap;
  uniformMap?: UniformMap;
}

export interface ModelConstructorParams {
  name: string;
}
