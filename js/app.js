// VUE COMPONENTS
// -----------------------------------------------------------------------------

Vue.component('todo-item', {
	props: ['todo'],
	template: '<li>{{todo.text}}</li>'
});

var audioOne = new Audio('./mp3/dice-one.mp3');
var audioTwo = new Audio('./mp3/dice-two.mp3');
var audioMulti = new Audio('./mp3/dice-multi.mp3');
var success_6 = new Audio('./mp3/6-success-wow.mp3');
var success_5 = new Audio('./mp3/5-success-wee.mp3');
var success_4 = new Audio('./mp3/4-success-sparkle.mp3');
var fail_3 = new Audio('./mp3/3-drums.mp3');
var fail_2 = new Audio('./mp3/2-fail-fart.mp3');
var fail_1 = new Audio('./mp3/1-sad-trombone.mp3');

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
		rollDescription: "",
		preferences: {
			diceSounds: true,
			resultSounds: true,
			diceCount: "highest",
			diceAmount: "dice-4",
			resultDescription: true
		},
		screenOptions: false,
	},
	computed: {
		diceHighest: function() {
			if (this.preferences.diceCount === "highest") {
				return true;
			} else {
				return false;
			}
		},
		diceLowest: function() {
			if (this.preferences.diceCount === "lowest") {
				return true;
			} else {
				return false;
			}
		},
		diceTotal: function() {
			if (this.preferences.diceCount === "total") {
				return true;
			} else {
				return false;
			}
		}
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

			// play dem bone sounds
			if (this.preferences.diceSounds === true ) {
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

			if (this.preferences.diceCount === 'lowest') {
				var count = Math.min(...result);
			} else {
				var count = Math.max(...result);
			}

			var sound;

			switch(count) {
				case 6:
					sound = success_6;
					this.rollDescription = "<span>👍 + 😃</span> Success + Something Good!"
					break;
				case 5:
					sound = success_5;
					this.rollDescription = "<span>👍</span> Success!"
					break;
				case 4:
					sound = success_4;
					this.rollDescription = "<span>👍 + 😧</span> Success + Something Bad!"
					break;
				case 3:
					sound = fail_3;
					this.rollDescription = "<span>👎 + 😃</span> Failure + Something Good!"
					break;
				case 2:
					sound = fail_2;
					this.rollDescription = "<span>👎</span> Failure!"
					break;
				default:
					sound = fail_1;
					this.rollDescription = "<span>👎 + 😧</span>Failure + Something Bad!"
			}

			if (this.preferences.resultSounds === true && this.preferences.diceCount !== "total" ) {
				setTimeout(function(){
					sound.play();
				}, 400)
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

