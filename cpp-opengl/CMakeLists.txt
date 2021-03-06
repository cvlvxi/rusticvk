
project(cppopengl)
cmake_minimum_required(VERSION 3.14)

get_filename_component(BIN "bin" ABSOLUTE)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${BIN}")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${BIN}")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${BIN}")

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Debug)
set(CMAKE_CXX_FLAGS_DEBUG "-g -O0")

set(WARNING_FLAGS "-Wall")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${WARNING_FLAGS}")

get_filename_component(EXTERN "extern" ABSOLUTE)
get_filename_component(INCLUDE "include" ABSOLUTE)

# External Dependencies
find_package(OpenGL REQUIRED)
add_subdirectory(${EXTERN})

add_definitions(
	-DLOG_USE_COLOR
)
add_library(log STATIC ${EXTERN}/log/src/log.c)
target_include_directories(log PUBLIC ${EXTERN}/log/src)


add_library(glapp INTERFACE)
target_include_directories(glapp INTERFACE src)
target_link_libraries(glapp INTERFACE glfw libglew_static glm log)

add_executable(main main.cpp)
target_link_libraries(main glapp)