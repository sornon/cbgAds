requirejs.config({
	baseUrl: '',
	 paths: {
		jquery: 'empty:',
		sharejQuery: 'empty:',
		swfobject: 'bower_components/swfobject/swfobject/src/swfobject'
	 },
	 name: 'bower_components/almond/almond',    //ָ��almond·������� almond��requirejs����棩https://github.com/jrburke/almond
	 include: ['site/main']//,
	 //insertRequire: ['site/init']
});