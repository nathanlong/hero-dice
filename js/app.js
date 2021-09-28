// VUE COMPONENTS
// -----------------------------------------------------------------------------

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
});

var audioOne = new Audio('./mp3/dice-one.mp3');
var audioTwo = new Audio('./mp3/dice-two.mp3');
var audioMulti = new Audio('./mp3/dice-multi.mp3');
var successBubble = new Audio('./mp3/success-bubble.mp3')
var successSparkle = new Audio('./mp3/success-sparkle.mp3')
var successWow = new Audio('./mp3/success-wow.mp3');
var successWee = new Audio('./mp3/success-wee.mp3');
var failDown = new Audio('./mp3/fail-down.mp3');
var failFart = new Audio('./mp3/fail-fart.mp3');
var failOh = new Audio('./mp3/fail-oh.mp3');
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
		prefSound: true,
		screenOptions: false,
	},
	computed: {
	},
	methods: {
		rollDice: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		rollX: function(value) {
			var dice = parseInt(value);
			var result = [];
			for(var i=0; i < dice; i++) {
				result.push(this.rollDice(1, 6));
			}
			this.rollResult(result);

			// roll them bones
			if (this.prefSound === true ) {
				if (value < 2) {
					audioOne.play();
				} else if (value > 1 && value <= 3 ) {
					audioTwo.play();
				} else {
					audioMulti.play();
				}
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
			var sound;

			if (this.prefSound === true ) {
				switch(max) {
					case 6:
						sound = successWow;
						break;
					case 5:
						sound = successWee;
						break;
					case 4:
						sound = successSparkle;
						break;
					case 3:
						sound = successBubble;
						break;
					case 2:
						sound = failFart;
						break;
					default:
						sound = failOh;
				}

				setTimeout(function(){
					sound.play();
				}, 500)
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
		},
		// accepts string of var
		screenSwitch: function() {
			if ( this.screenOptions === false ) {
				this.screenOptions = true;
			} else {
				this.screenOptions = false;
			}
		}
	},
})

