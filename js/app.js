// VUE COMPONENTS
// -----------------------------------------------------------------------------

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
});

var audioOne = new Audio('./mp3/dice-one.mp3');
var audioTwo = new Audio('./mp3/dice-two.mp3');
var audioMulti = new Audio('./mp3/dice-multi.mp3');

// VUE APP
// -----------------------------------------------------------------------------
var app = new Vue({
	el: '#app',
	data: {
		roll: [],
		log: [],
		rollTotal: 0,
	},
	computed: {
	},
	methods: {
		rollDice: function() {
			var roll = Math.floor(Math.random() * 6) + 1;
			return roll;
		},
		rollX: function(value) {
			var dice = parseInt(value);
			var result = [];
			for(var i=0; i < dice; i++) {
				result.push(this.rollDice());
			}
			this.rollResult(result);

			if (value <= 2) {
				audioOne.play();
			} else if (value > 2 && value <= 4 ) {
				audioTwo.play();
			} else {
				audioMulti.play();
			}
			// console.log(dice, result);
		},
		rollResult: function(result) {
			this.roll = result;
			this.rollTotal = this.rollSum(result);
			this.log.push(result);
		},
		rollSum: function(value) {
			var sum = value.reduce(function(a,b){
				return a + b;
			}, 0);
			return sum;
		},
		scrollLog: function() {
			var element = document.getElementById("log");
			var inner = document.getElementById("log-inner");
			element.scrollTop = inner.offsetHeight + 200 ;
		},
		clearRoll: function() {
			this.roll = [];
			this.scrollLog();
		}
	},
})

