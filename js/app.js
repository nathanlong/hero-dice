// VUE COMPONENTS
// -----------------------------------------------------------------------------

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
});

// VUE APP
// -----------------------------------------------------------------------------
var app = new Vue({
	el: '#app',
	data: {
	},
	computed: {
	},
	methods: {
	}
})

