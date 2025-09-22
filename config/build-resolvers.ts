import { Configuration } from "webpack";

export function webpackBuildResolvers(): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  };
}