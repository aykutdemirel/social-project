(function() {
	'use strict';

	angular
		.module('social-project.home', [
			'ionic',
			'ngCordova',
			'social-project.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						'menuContent': {
							templateUrl: 'scripts/home/home.html',
							controller: 'HomeController as vm'
						}
					}
				});
		});
})();
