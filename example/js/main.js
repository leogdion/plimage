require.config({
	baseUrl : '../',
	paths : {
		'async' : 'bower_components/async/lib/async',
		'jquery' : 'bower_components/jquery/jquery',
		'PlImage' : 'lib/index'
	}
});

define(['PlImage'], function (PlImage) {
	PlImage.load(
		['images/0.gif','images/1.gif','images/2.gif','images/3.gif',
		'images/4.png','images/5.png','images/6.png','images/7.png','images/8.png'],
		{
			each : function (item, progress) {
				console.log(item);
			},
			done : function (error) {
				console.log(error);
			}
		})
});