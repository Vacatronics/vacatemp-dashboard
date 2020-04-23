const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const { getThemeVariables } = require('antd/dist/theme');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');


module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...getThemeVariables({dark: true}),
      '@primary-color': '#1DA57A',
    },
  }),

  addWebpackPlugin(new AntdDayjsWebpackPlugin())
);