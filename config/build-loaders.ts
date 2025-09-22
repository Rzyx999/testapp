import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { WPBuildOptions } from './types/types';

type WPLoader = ModuleOptions['rules'][number];

export function webpackBuildLoaders(options: WPBuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';
  const scssLoader: WPLoader = {
    test: /\.(s[ac]|c)ss$/i,
    use: [ 
      MiniCssExtractPlugin.loader, 
      { loader: 'dts-css-modules-loader', options: { namedExport: true } },
      { loader: 'css-loader', options: { modules: { exportLocalsConvention: 'camelCaseOnly', localIdentName: '[local]'} } },
      'sass-loader'
    ]
  };
  
  const tsLoader: WPLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
          })
        }
      }
    ]
  };

  return [scssLoader, tsLoader];
}