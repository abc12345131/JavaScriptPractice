const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true,
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { 
                '@brand-primary': '#1EB270',
                "@brand-primary-tap": "#1DA57A", 
            },
        }
    }),
);