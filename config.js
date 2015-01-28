requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        sharejQuery: 'empty:',
        swfobject: 'bower_components/swfobject/swfobject/src/swfobject'
    },
    name: 'bower_components/almond/almond',    //指定almond路径，打包 almond（requirejs精简版）https://github.com/jrburke/almond
    include: ['site/main'],
    shim: {
        'swfobject': {
            exports: 'swfobject'
        }
    }
    //insertRequire: ['site/init']
});