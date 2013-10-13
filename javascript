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
	fresh_deck = new deck_of_cards();
	fresh_deck.create_deck();
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
		$(document).on("click", ".choice-red", function() {
			$(".choice-red,.choice-black").hide();
			var dealt_card = fresh_deck.deal_card();
			console.log(dealt_card);
			$(this).parent().css("background-color", "white").html("");
			
			
		});
		$(document).on("click", ".choice-black", function() {
			//alert("hi");	
		});
	});









