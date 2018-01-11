angular.module('digPront').component('authFieldR', {
	bindings: {
		id: '@',
		label: '@',
		type: '@',
		grid: '@',
		icon: '@',
		model: '=',
		classD: '@',
		placeholder: '@',
		hide: '<'
	},
	controller: function() {
		this.$onInit = () => {
			this.iconClasses = `glyphicon glyphicon-${this.icon} form-control-feedback`
		}
	},
	template: `
		<div class="form-group has-feedback">
			<input ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control {{ $ctrl.classD }}"
				type="{{ $ctrl.type }}" placeholder="{{ $ctrl.placeholder }}"
				ng-hide="$ctrl.hide" required />
			<span class="{{ $ctrl.iconClasses }}"></span>
		</div>
	`
})