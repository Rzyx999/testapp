import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { WPBuildOptions } from './types/types';

export function webpackBuildDevServer(options: WPBuildOptions): DevServerConfiguration {
 return {
    port: options.port ?? 3000,
    compress: true,
    historyApiFallback: true,
    open: true,
    hot: true
  } 
}