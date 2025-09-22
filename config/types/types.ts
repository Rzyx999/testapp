export interface WPBuildPaths {
  entry: string;
  html: string;
  output: string;
}

export type WPBuildMode = 'production' | 'development';

export interface WPBuildOptions {
  port: number;
  paths: WPBuildPaths;
  mode: WPBuildMode;
}