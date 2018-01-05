angular.module('digPront').component('authFieldR', {
	bindings: {
		id: '@',
		label: '@',
		type: '@',
		grid: '@',
		icon: '@',
		model: '=',
		placeholder: '@',
		hide: '<',
		pattern: '@'
	},
	controller: function() {
		this.$onInit = () => {
			this.iconClasses = `glyphicon glyphicon-${this.icon} form-control-feedback`
		}
	},
	template: `
		<div class="form-group has-feedback">
			<input ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control"
				type="{{ $ctrl.type }}" placeholder="{{ $ctrl.placeholder }}"
				pattern="{{ $ctrl.pattern }}" ng-pattern-restrict required
				ng-hide="$ctrl.hide" />
			<span class="{{ $ctrl.iconClasses }}"></span>
		</div>
	`
})