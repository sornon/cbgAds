//The build will inline common dependencies into this file.

requirejs.config({
	baseUrl: '',
	 paths: {
		jquery: 'empty:',
		sharejQuery: 'empty:',
	 },
	 name: 'almond',    //指定almond路径，打包 almond（requirejs精简版）https://github.com/jrburke/almond
	 include: ['site/init'],
	 insertRequire: ['site/init']
});