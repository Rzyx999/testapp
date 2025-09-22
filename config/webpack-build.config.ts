import webpack from 'webpack';

import { WPBuildOptions } from './types/types';
import { webpackBuildDevServer } from './build-dev-server';
import { webpackBuildLoaders } from './build-loaders';
import { webpackBuildPlugins } from './build-plugins';
import { webpackBuildResolvers } from './build-resolvers';

export function webpackBuild(options: WPBuildOptions) {
  const { mode, paths } = options;
  const isDevMode = mode === 'development';

  const config: webpack.Configuration = {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true
    },
    plugins: webpackBuildPlugins(options),
    module: {
      rules: webpackBuildLoaders(options)
    },
    resolve: webpackBuildResolvers(),
    devtool: isDevMode && 'inline-source-map',
    devServer: isDevMode ? webpackBuildDevServer(options) : undefined,
  };

  return config;
}