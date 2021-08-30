// VUE COMPONENTS
// -----------------------------------------------------------------------------

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
});

var audioOne = new Audio('./mp3/dice-one.mp3');
var audioTwo = new Audio('./mp3/dice-two.mp3');
var audioMulti = new Audio('./mp3/dice-multi.mp3');
var successGlimmer = new Audio('./mp3/success-glimmer.mp3');
var successWow = new Audio('./mp3/success-wow.mp3');
var failDown = new Audio('./mp3/fail-down.mp3');
var failHooya = new Audio('./mp3/fail-hooyah.mp3');

// VUE APP
// -----------------------------------------------------------------------------
var app = new Vue({
	el: '#app',
	data: {
		diceNumber: 0,
		log: [],
		multiDice: false,
		roll: [],
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

			if (value < 2) {
				audioOne.play();
			} else if (value > 1 && value <= 3 ) {
				audioTwo.play();
			} else {
				audioMulti.play();
			}
			// console.log(dice, result);
		},
		rollMulti: function() {
			this.multiDice = false;
			this.rollX(this.diceNumber);
		},
		rollResult: function(result) {
			this.roll = result;
			this.rollTotal = this.rollSum(result);
			this.log.push(result);

			var max = Math.max(...result);
			if (max === 6) {
				setTimeout(function(){
					successWow.play()
				}, 500);
			} else if (max === 5) {
				setTimeout(function(){
					successGlimmer.play()
				}, 500);
			} else if (max === 2) {
				setTimeout(function(){
					failDown.play()
				}, 500);
			} else if (max === 1) {
				setTimeout(function(){
					failHooya.play()
				}, 500);
			}
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

