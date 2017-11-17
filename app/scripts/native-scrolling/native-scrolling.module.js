(function() {
	'use strict';

	angular
		.module('social-project.native-scrolling', [
			'ionic',
			'social-project.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.native-scrolling', {
					url: '/native-scrolling',
					views: {
						'menuContent': {
							templateUrl: 'scripts/native-scrolling/native-scrolling.html',
							controller: 'NativeScrollingController as vm'
						}
					}
				});
		});
})();
