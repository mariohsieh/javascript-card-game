	function deck_of_cards() {

		//this.cards = new Array();

		this.create_deck = function create_deck() {
			this.cards = new Array();
			var card_suits = ["C", "D", "H", "S"];
			var card_values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
			

			for (var i=0;i<card_suits.length;i++){
				for (var j=0;j<card_values.length;j++) {
					this.cards.push(card_suits[i]+card_values[j]);
				}
			}
			//console.log(this.cards);
		}

		this.deal_card = function deal_card() {
			this.dealt = "";
	
			var temp = Math.floor((Math.random()*this.cards.length)+1)-1;
			//console.log(temp);
			var card = this.cards[temp];
			this.cards.splice(temp, 1);			
			this.dealt = card;
			//console.log(temp);
			
			return this.dealt;
		}
	}

	function start() {
		fresh_deck = new deck_of_cards();
		fresh_deck.create_deck();
	}
	start();
	//console.log(fresh_deck.cards);
	//console.log(fresh_deck.cards.length);

	//console.log(fresh_deck.deal_card(5));
	//console.log(fresh_deck.cards);
	//console.log(fresh_deck.cards.length);
	
	//fresh_deck.deal_card(5);
	//console.log(fresh_deck.dealt);
	//console.log(fresh_deck.cards);





	// jQuery code 
	$(document).ready(function() {
		var card_value;
		var card_suit;

		function card_display(card) {
			var temp = card.substring(0,1);	
			if (temp == 'H' || temp == 'D') {
				if (temp == 'H') {
					card_suit = "&hearts;"
				} else {
					card_suit = "&diams;"
				}
			} else {
				if (temp == 'S') {
					card_suit = "&spades;"
				} else {
					card_suit = "&clubs;"
				}
			}
			var temp = card.substr(1);
			card_value = temp;
			//console.log(card_suit);
			//console.log(card_value);
		}

		function reset() {
			$(".value").remove();
			$(".suit").remove();
			$(".level1").css("display", "inherit");
			$(".card").css("background-color", "#3399FF");
		}

		function restart() {
			
			var refresh = confirm("You lose!  Would you like to play again?");
			reset();
			if (refresh) {
				document.location = "#page5";
				start();
			} else {
				document.location = "#page-cover";
			}
		}

		$(document).on("click", ".level1", function() {
			//$(this).css("visibility", "hidden");
			//$(this).next().css("visibility", "hidden");
			//$(this).css("display", "none");
			//$(this).next().css("display", "none");

			$(".level1").css("display", "none");	
			var dealt_card = fresh_deck.deal_card();
			card_display(dealt_card);			
			//console.log(dealt_card);
			$(this).parent().css("background-color", "white").prepend("<p class='value right "+dealt_card+"'>"+card_value+"</p><p class='suit left "+dealt_card+"'>"+card_suit+"</p>");

			if (card_suit == '&hearts;' || card_suit == '&diams;') {
				$("."+dealt_card).addClass("red");
			}
			
			if ($(this).hasClass("choice-red") && (card_suit == '&hearts;' || card_suit == '&diams;')) {
				//alert("red win");
				window.location = "#page4";
			} else if ($(this).hasClass("choice-black") && (card_suit == '&clubs;' || card_suit == '&spades;')) {
				//alert("black win!");
				window.location = "#page4";
			} else {
				restart();
			}
			
		});
	});

	







