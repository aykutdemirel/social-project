(function() {
	'use strict';

	angular
		.module('social-project.menu', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/menu/menu.html',
					controller: 'MenuController as vm'
				});
		});
})();
