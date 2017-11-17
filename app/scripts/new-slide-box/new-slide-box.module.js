(function() {
	'use strict';

	angular
		.module('social-project.new-slide-box', [
			'ionic',
			'social-project.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.new-slide-box', {
					url: '/new-slide-box',
					views: {
						'menuContent': {
							templateUrl: 'scripts/new-slide-box/new-slide-box.html',
							controller: 'NewSlideBoxController as vm'
						}
					}
				});
		});
})();
