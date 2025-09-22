import path from 'path';
import webpack from 'webpack';
import { webpackBuild } from './config/webpack-build.config';
import { WPBuildMode, WPBuildPaths } from './config/types/types';

interface EnvVars {
  mode: WPBuildMode;
  port: number;
}

function webpackConfig(env: EnvVars) {
  const paths: WPBuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html')
  };
  const config: webpack.Configuration =  webpackBuild({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths
  });
  return config;
};

export default webpackConfig;