
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { WPBuildOptions } from './types/types';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function webpackBuildPlugins(options: WPBuildOptions): webpack.Configuration['plugins'] {
  const plugins: webpack.Configuration['plugins'] = [
      new HtmlWebpackPlugin({ template: options.paths.html })
  ];
  
  if (options.mode === 'development') {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ReactRefreshPlugin());
  }

  plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css'
  }));


  return plugins;
}