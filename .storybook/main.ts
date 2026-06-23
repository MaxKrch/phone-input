import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-webpack5",

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'demo': path.resolve(__dirname, '../src/demo'),
        'features': path.resolve(__dirname, '../src/features'),
        'store': path.resolve(__dirname, '../src/store'),
        'shared': path.resolve(__dirname, '../src/shared'),
      };
    }

    if (config.module && config.module.rules) {
      config.module.rules.push(
        {
          test: /\.module\.s[ac]ss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  exportLocalsConvention: "as-is",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /\.module\.s[ac]ss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        }
      );
    }

    return config;
  },
};
export default config;