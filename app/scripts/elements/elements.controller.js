(function() {
	'use strict';

	angular
		.module('social-project.elements')
		.controller('ElementsController', ElementsController);

		ElementsController.$inject = ['menuItems'];

	/* @ngInject */
	function ElementsController(menuItems) {
		var vm = angular.extend(this, {
			//TODO: add methods and properties to this controller
		});

	}
})();
