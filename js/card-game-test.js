// function declaration for a deck of cards
function deck_of_cards() {

	// method to make a deck of cards
	this.create_deck = function create_deck() {
		this.cards = new Array();
		var card_suits = ["C", "D", "H", "S"];
		var card_values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
		
		// two for loops to create a full deck of cards
		for (var i=0;i<card_suits.length;i++){
			for (var j=0;j<card_values.length;j++) {
				this.cards.push(card_suits[i]+card_values[j]);
			}
		}
		//console.log(this.cards);
	}

	// method to deal cards
	this.deal_card = function deal_card() {
		this.dealt = "";

		// generates a random number and selects that from the deck
		var temp = Math.floor((Math.random()*this.cards.length)+1)-1;
		//console.log(temp);
		var card = this.cards[temp];
		this.cards.splice(temp, 1);			
		this.dealt = card;
		//console.log(temp);
		
		return this.dealt;
	}
}

// function to create a game session
function Game() {
	this.start = function() {
		fresh_deck = new deck_of_cards();
		fresh_deck.create_deck();
	}
}


// jQuery code /////////////////////////////////////////
$(document).ready(function() {

	// scroll function for pages
	function scroll(page) {
		$("html, body").animate({
			scrollTop: $("#" + page).offset().top }, 1000
		);
		//console.log(page);
		return false;	
	}

	// start game function
	function start_game() {
		$(".value").remove();
		$(".value-lower").remove();
		$(".suit").remove();
		$(".card").css("background-color", "#3399FF");
		$(".level1").css("display", "inherit");
		$(".level2").css("display", "none");
		$(".level3").css("display", "none");
		$(".level4").css("display", "none");
		$(".level5").css("display", "none");
		$("#level-1-title").css("visibility", "visible");
		$("#level-2-title").css("visibility", "hidden");
		$("#level-3-title").css("visibility", "hidden");
		$("#level-4-title").css("visibility", "hidden");
		$("#level-5-title").css("visibility", "hidden");		

		// create instance of Game function
		var game = new Game();
		game.start();
		
		// code to deal all 15 cards
		for (var i=1;i<=15;i++) {
			var dealt_card = fresh_deck.deal_card();
			$("#" + i).attr("name", dealt_card);
		}
	}
 
	// declare variables
	var dealt_card;
	var card_suit;
	var card_value;
	var old_value;

	// function to get suit symbol for card display
	function card_display(card) {
		var temp = card.substring(0,1);	
		if (temp == 'H') {
			card_suit = "&hearts;"
		} else if (temp == 'D') {
			card_suit = "&diams;"
		} else if (temp == 'S') {
			card_suit = "&spades;"
		} else {
			card_suit = "&clubs;"
		}

		var temp = card.substr(1);
		card_value = temp;
		//console.log(card_suit);
		//console.log(card_value);
	}

	// function to change the card value from a string to an integer
	function change_to_numbers(temp) {
		switch (temp) {
			case 'A':
				temp = 1;
				break;	
			case '2':
				temp = 2;
				break;
			case '3':
				temp = 3;
				break;
			case '4':
				temp = 4;
				break;
			case '5':
				temp = 5;
				break;
			case '6':
				temp = 6;
				break;
			case '7':
				temp = 7;
				break;
			case '8':
				temp = 8;
				break;
			case '9':
				temp = 9;
				break;
			case '10':
				temp = 10;
				break;
			case 'J':
				temp = 11;
				break;
			case 'Q':
				temp = 12;
				break;
			case 'K':
				temp = 13;
				break;
		}
		return temp;
	}

	// game restart
	function restart() {
		var refresh = confirm("You lose!  Would you like to play again?");
		if (refresh) {
			scroll("page1");
			start_game();
		} else {
			scroll("page-cover");
		}
	}

	/////// event listener functions ///////////


	// start game
	$("#start").click(function() {
		scroll("page1");
		start_game();
	});

	// actions for level 1 clicks
	$(document).on("click", ".level1", function() {
		$(".level1").css("display", "none");
		dealt_card = $(this).parent().attr("name");
		card_display(dealt_card);			

		$(this).parent().css("background-color", "white").prepend("<p class='value left "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		$(this).parent().css("background-color", "white").append("<p class='value-lower right "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		if (card_suit == '&hearts;' || card_suit == '&diams;') {
			$("."+dealt_card).addClass("red");
		}
		
		// if statement for win/loss
		if ($(this).hasClass("choice-red") && (card_suit == '&hearts;' || card_suit == '&diams;')) {
			scroll("page2");
			$("#level-1-title").css("visibility", "hidden");
			$("#level-2-title").css("visibility", "visible");
			$(".level2").css("display", "inherit");
			old_value = card_value;
		} else if ($(this).hasClass("choice-black") && (card_suit == '&clubs;' || card_suit == '&spades;')) {
			scroll("page2");
			$("#level-1-title").css("visibility", "hidden");
			$("#level-2-title").css("visibility", "visible");
			$(".level2").css("display", "inherit");
			old_value = card_value;
		} else {
			restart();
		}		
	});

	// actions for level 2 clicks
	$(document).on("click", ".level2", function() {
		dealt_card = $(this).parent().attr("name");
		card_display(dealt_card);
		$(".level2").css("display", "none");

		$(this).parent().css("background-color", "white").prepend("<p class='value left "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		$(this).parent().css("background-color", "white").append("<p class='value-lower right "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		if (card_suit == '&hearts;' || card_suit == '&diams;') {
			$("."+dealt_card).addClass("red");
		}

		old_value = change_to_numbers(old_value);
		//console.log(old_value);
		card_value = change_to_numbers(card_value);
		//console.log(card_value);

		// function for high-low win statement
		if (card_value == old_value) {
			alert("Please choose again.");
			$(".level2").css("display", "inherit");
			$(this).css("display", "none");
			$(this).siblings("div").css("display", "none");
		} else if ($(this).hasClass("choice-high") && card_value < old_value) {
			//alert("you lose with choice-high");
			restart();
		} else if ($(this).hasClass("choice-high") && card_value > old_value) {
			//alert("you win with choice-high");
			scroll("page3");
			$("#level-2-title").css("visibility", "hidden");
			$("#level-3-title").css("visibility", "visible");
			$(".level3").css("display", "inherit");
		} else if ($(this).hasClass("choice-low") && card_value > old_value) {
			//alert("you lose with choice-low");
			restart();
		} else if ($(this).hasClass("choice-low") && card_value < old_value) {
			//alert("you win with choice-low");
			scroll("page3");
			$("#level-2-title").css("visibility", "hidden");
			$("#level-3-title").css("visibility", "visible");
			$(".level3").css("display", "inherit");
		}
	});

	// actions for level 3 clicks
	$(document).on("click", ".level3", function() {
		dealt_card = $(this).parent().attr("name");
		card_display(dealt_card);
		$(".level3").css("display", "none");

		$(this).parent().css("background-color", "white").prepend("<p class='value left "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		$(this).parent().css("background-color", "white").append("<p class='value-lower right "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		if (card_suit == '&hearts;' || card_suit == '&diams;') {
			$("."+dealt_card).addClass("red");
		}

		// if statement win/loss
		if ($(this).hasClass("choice-red") && (card_suit == '&hearts;' || card_suit == '&diams;')) {
			//alert("red win");
			scroll("page4");
			$("#level-3-title").css("visibility", "hidden");
			$("#level-4-title").css("visibility", "visible");
			$(".level4").css("display", "inherit");
			old_value = card_value;
		} else if ($(this).hasClass("choice-black") && (card_suit == '&clubs;' || card_suit == '&spades;')) {
			//alert("black win!");
			scroll("page4");
			$("#level-3-title").css("visibility", "hidden");
			$("#level-4-title").css("visibility", "visible");
			$(".level4").css("display", "inherit");
			old_value = card_value;
		} else {
			restart();
		}
	});

	// actions for level 4 clicks
	$(document).on("click", ".level4", function() {
		dealt_card = $(this).parent().attr("name");
		card_display(dealt_card);
		$(".level4").css("display", "none");

		$(this).parent().css("background-color", "white").prepend("<p class='value left "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		$(this).parent().css("background-color", "white").append("<p class='value-lower right "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		if (card_suit == '&hearts;' || card_suit == '&diams;') {
			$("."+dealt_card).addClass("red");
		}

		old_value = change_to_numbers(old_value);
		//console.log(old_value);
		card_value = change_to_numbers(card_value);
		//console.log(card_value);

		if (card_value == old_value) {
			alert("Please choose again.");
			$(".level4").css("display", "inherit");
		} else if ($(this).hasClass("choice-high") && card_value < old_value) {
			//alert("you lose with choice-high");
			restart();
		} else if ($(this).hasClass("choice-high") && card_value > old_value) {
			//alert("you win with choice-high");
			scroll("page5");
			$("#level-4-title").css("visibility", "hidden");
			$("#level-5-title").css("visibility", "visible");
			$(".level5").css("display", "inherit");
		} else if ($(this).hasClass("choice-low") && card_value > old_value) {
			//alert("you lose with choice-low");
			restart();
		} else if ($(this).hasClass("choice-low") && card_value < old_value) {
			//alert("you win with choice-low");
			scroll("page5");
			$("#level-4-title").css("visibility", "hidden");
			$("#level-5-title").css("visibility", "visible");
			$(".level5").css("display", "inherit");
		}
	});

	// actions for level 5 clicks
	$(document).on("click", ".level5", function() {
		dealt_card = $(this).parent().attr("name");
		card_display(dealt_card);
		$(".level5").css("display", "none");

		$(this).parent().css("background-color", "white").prepend("<p class='value left "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		$(this).parent().css("background-color", "white").append("<p class='value-lower right "+dealt_card+"'>"+card_value+"<br />" + card_suit + "</p>");
		if (card_suit == '&hearts;' || card_suit == '&diams;') {
			$("."+dealt_card).addClass("red");
		}

		// if statement win/loss
		var win = "Congrats!! You made it to the top!  Thank you for playing!";
		if ($(this).hasClass("choice-red") && (card_suit == '&hearts;' || card_suit == '&diams;')) {
			alert(win);
		} else if ($(this).hasClass("choice-black") && (card_suit == '&clubs;' || card_suit == '&spades;')) {
			alert(win);
		} else {
			restart();
		}			
	});
});










