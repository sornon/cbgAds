//The build will inline common dependencies into this file.

requirejs.config({
	baseUrl: '',
	 paths: {
		jquery: 'empty:',
		sharejQuery: 'empty:',
	 },
	 name: 'bower_components/almond/almond',    //ָ��almond·������� almond��requirejs����棩https://github.com/jrburke/almond
	 include: ['site/main']//,
	 //insertRequire: ['site/init']
});