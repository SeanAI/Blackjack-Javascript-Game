/*jslint browser: true, indent: 3 */

// Name(s): Maddi Moeller, Sean Brace


/*
   Robert Arnold, friend of Maddi's, helped with debugging the program, got it to actually work.
   robertarnold391@gmail.com


   Line 133: Fixed number for cards - needed to be a whole number so used Math.round

   Added on line 45 thru 47: Validation for passing null into getTotalValue

   Line 130: card pushed to hand both in deal method, and  createCard method, adding it twice.

   Line 54: Get total values now adds up the value of the cards, not the value of the card objects

   Line 400: Update newGame state on newGame start, after hands have been dealt, rather than before.

   Check vals passes in return value of total functions, instead of functions themselves.

   Value for hitButton on dealer move had > the wrong way round.

   On dealer move I think there was a standButton that was meant to be a hit.
*/

// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
   'use strict'; // Enforce stricter JavaScript rules.

   // IIFE begins the program.
   (function () {
      var createHand, createGame;
      // createHand is an object factory, creates hand objects that have card objects as a property, make Cards sub-objects to hand objects.
      createHand = function () {
         var hand, handState;

         handState = {
            // hasStood tracks whether the player or dealer have hit the stand button, used in .deal(), if this.hasStood then return from the functiona and don't deal to them.
            stood: false
         };

         hand = {
            // Holds the values of the cards in Hand.
            cardVals: [],
            // getTotalValue() takes an array and returns the sum of its elements, used to get deck score.
            getTotalValue: function (array) {
               var count, total;

               total = 0;

               for (count = 0; count < array.length; count += 1) {
                  total += array[count].getNumber();//getVal(array[count].number());
               }
               return total;
            },
            getStood: function () {
               return handState.stood;
            },
            setStood: function (value) {
               handState.stood = value;
            },
            // Holds total of each hand created, cuts out having to call getTotalValue repeatedly.
            total: function () {
               return hand.getTotalValue(hand.cardVals);
            },
            getNumCards: function () {
               return hand.cardVals.length;
            },
            addCard: function (newCard) {
               hand.cardVals.push(newCard);
            },
            // createCard creates a card object with all of its properties, card becomes a sort of sub-object to Hand, makes sense if you think about it.
            createCard: function (c) {
               var card, cardState;

               //document.querySelector('#debug').textContent = c;
               cardState = {
                  face: '',
                  number: 0
               };

               //document.querySelector('#debug').textContent += ' i' + cardState.number;

               card = {
                  findFace: function (num) {
                     var faceVal;
                     if (num === 13) {
                        faceVal = 'King';
                     } else if (num === 12) {
                        faceVal = 'Queen';
                     } else if (num === 11) {
                        faceVal = 'Jack';
                     } else if (num === 1) {
                        faceVal = 'Ace';
                     } else {
                        faceVal = '';
                     }
                     return faceVal;
                  },
                  setFace: function (val) {
                     cardState.face = val;
                  },
                  getFace: function () {
                     return cardState.face;
                  },
                  getNumber: function () {
                     return cardState.number;
                  },
                  setNumber: function (num) {
                     cardState.number = num;
                  },
                  // returns card's real value
                  getVal: function (num) {
                     //document.querySelector('#debug').textContent += ' num=' + num;
                     if (num >= 11) {
                        card.setFace(card.findFace(num));
                        num = 10;
                        // If num = 1, it is an Ace which can equal 1 or 11 depending on what's best for the hand, since 1 is less likely to put the hand over 21, it is the default value
                        // for Aces.
                     } else if (num === 1) {
                        card.setFace(card.findFace(num));
                           // Checks hand's total value, so long as the Ace being equal to 11 doesn't put the hand over 21, the Ace equals 11 instead.
                        if (hand.total() <= 11) {
                           num = 11;
                        }
                     }

                     return num;
                     //document.querySelector('#debug').textContent += ' number=' + cardState.number;
                  },
                  name: function () {
                     var cardName;
                     if (card.getFace() !== '') {
                        cardName = card.getFace();
                     } else {
                        cardName = card.getNumber();
                     }
                     return cardName;
                  }
               };
               card.setNumber(card.getVal(c));
               //document.querySelector('#debug').textContent += ' EE' + card.number();
               hand.addCard(card);
            },
            // Uses hand.createCard() to add cards to players hand, stores new cards in hand.cardVals[].
            deal: function () {
               var newCard;

               if (!hand.getStood()) {
                  newCard = Math.floor(Math.random() * 13 + 1);
                  hand.createCard(newCard);
                  // Checks if this is the first .deal() call of the newGame, if it is .deal() calls itself again after setting startingDealDone = true, ending the recursion.
                  if (hand.getNumCards() < 2) {
                     hand.deal();
                  }
               }
            }
         };

         return hand;
      };

      createGame = function (moneyVal, betVal) {
         var gameState, game;

         gameState = {
            money: moneyVal,
            bet: betVal,
            win: 'You Win!',
            lose: 'You Lose!',
            blackJack: 'Blackjack!',
            tie: 'Tie!',
            promptPlayer: 'Please place your bets, then press Start game to play!'
         };

         // Keeps track of how many wins/losses player has, as well as their money, object can increment wins, losses, and money accordingly.
         game = {
            getWin: function () {
               return gameState.win;
            },
            getLose: function () {
               return gameState.lose;
            },
            getBlackJack: function () {
               return gameState.blackJack;
            },
            getTie: function () {
               return gameState.tie;
            },
            // Prompts player for bets, lets them know to hit #start-game button to play again.
            getPromptPlayer: function () {
               return gameState.promptPlayer;
            },
            messageOutput: function (message) {
               // Outputs win/loss/blackJack/tie message so the player is told the result.
               document.querySelector('#message').textContent = message;
			   document.querySelector('#message').visible = true;
            },
            getMoney: function () {
               return gameState.money;
            },
            setMoney: function (num) {
               gameState.money = num;
            },
            // Uses game.setMoney to increment handState.money
            addMoney: function (num) {
               game.setMoney(game.getMoney() + num);
            },
            getBet: function () {
               return gameState.bet;
            },
            /* Special case: Used in newGame.addBet() to keep bet from going negative and giving the player free money.*/
            // Used in newGame.winBet() to clear bet after giving the player their winnings, used in gameEnd() depending on the result that is passed to gameEnd(),
            // used in #start-game to clear bet
            clearBet: function (lost) {
               if (!lost) {
                  game.addMoney(game.getBet());
               }
               game.setBet(0);
            },
            setBet: function (num) {
               gameState.bet = num;
            },
            // Increments handState.bet by num, this is used for the raise and lower bet buttons, to lower pass a negative value.
            addBet: function (num) {
               // checks if gameState.bet will go negative, this shouldn't be possible, if not then proceed normally, add num to bet and take num away from money.
               if (game.getBet() + num >= 0) {
                  game.setBet(game.getBet() + num);
                  game.addMoney(-num);
               // Action will cause Bet to be negative and money to go up without the player winning, can't happen.
               } else {
                  game.clearBet(false);
               }
            },
            // Adds winnings to #player-money, outputs win message, clears handState.bet
            winBet: function () {
               game.addMoney(game.getBet() * 2);
               game.clearBet(true);
            }
         };

         return game;
      };
      (function () {
         var playerHand, dealerHand, gameStart, newGame, updateGame, checkAce, gameEnd, checkVals, hitButton, standButton, dealerMove;

         // Initialize objects for use in code below.
         dealerHand = createHand();
         playerHand = createHand();

         // gameStart used to make sure player can't hit any of the card interaction buttons until they've started a game by clicking '#start-game' button,
         // when gameStart = true, player can only interact with card buttons, else player can only interact with bet buttons, player can always interact with #start-game.
         gameStart = false;

         // Creates first newGame, required for statements in updateGame directed towards newGame.getMoney() and newGame.getBet(), this game object is overwritten
         // once 'game start' has been pressed.
         newGame = createGame(1000, 0);

         // Updates view, for the new cards or hands made in #player/dealer-cards, the #player/dealer-total-value elements, and the #player-money and #player-bet elements, 
         // function calls checkVals to check for any winners, updateGame is called after any button press to update view and ensure timely win/loss/tie messages.
         updateGame = function (skipCheck) {
            var count, playerCardOutputElement, dealerCardOutputElement, playerTotalOutputElement, dealerTotalOutputElement, moneyOutputElement, betOutputElement;


            // playerCardOutputElement used to output new card objects in playerHand into the view.
            playerCardOutputElement = document.querySelector('#player-cards');
            // dealerCardOutputElement used to output new card objects in dealerHand into the view.
            dealerCardOutputElement = document.querySelector('#dealer-cards');

            // Used to output player's hand total.
            playerTotalOutputElement = document.querySelector('#player-total-value');
            // Used to output dealer's hand total.
            dealerTotalOutputElement = document.querySelector('#dealer-total-value');


            // Clears '#player-cards' area.
            while (playerCardOutputElement.hasChildNodes()) {
               playerCardOutputElement.removeChild(playerCardOutputElement.firstChild);
            }
            // Clears '#dealer-cards' area.
            while (dealerCardOutputElement.hasChildNodes()) {
               dealerCardOutputElement.removeChild(dealerCardOutputElement.firstChild);
            }

            // Two for loops to rebuild player and dealer hands.
            // For loop places the appropriate number of divs on table depending on the number of cards in playerHand.
            for (count = 0; count < playerHand.cardVals.length; count += 1) {
               // Create a new div element in HTML and insert it just inside the end of the list.
               playerCardOutputElement.insertAdjacentHTML('beforeend', '<div>' + playerHand.cardVals[count].name() + '</div>');
            }
            // Immediately output most recent player hand total after player's hand divs are created.
            playerTotalOutputElement.textContent = "Player Hand Value: " + playerHand.total();

            // This output is only for when the page first loads so that #dealer-total-value <p> isn't empty while the player's is = 0, after game actually starts,
            // this is overwritten.
            dealerTotalOutputElement.textContent = "Dealer Hand Value: " + dealerHand.total();

            // For loop places the appropriate number of divs on table depending on the number of cards in dealerHand.
            for (count = 0; count < dealerHand.cardVals.length; count += 1) {
				if (dealerHand.getNumCards() === 2 && count === 1) {
               if (playerHand.getStood()) {
                  // Game has ended, show second card.
                  dealerCardOutputElement.insertAdjacentHTML('beforeend', '<div>' + dealerHand.cardVals[count].name() + '</div>');
                  // Show real total.
                  dealerTotalOutputElement.textContent = "Dealer Hand Value: " + dealerHand.total();
               } else {
                  // Create a new div element in HTML and insert it just inside the end of the list.
                  dealerCardOutputElement.insertAdjacentHTML('beforeend', '<div></div>');
                  // Hides hand's real value from output, total shown to be the value of the only card visible to the player.
                  dealerTotalOutputElement.textContent = "Dealer Hand Value: " + dealerHand.cardVals[0].getNumber();
               }
				} else {
				   // Create a new div element in HTML and insert it just inside the end of the list.
				   dealerCardOutputElement.insertAdjacentHTML('beforeend', '<div>' + dealerHand.cardVals[count].name() + '</div>');
					dealerTotalOutputElement.textContent = "Dealer Hand Value: " + dealerHand.total();
				}

            }


            // used to output money and bet.
            moneyOutputElement = document.querySelector('#player-money');
            betOutputElement = document.querySelector('#player-bet');

            if (!skipCheck) {
               checkVals(newGame, playerHand, dealerHand);
            }

            // Output money and bet.
            moneyOutputElement.textContent = 'Money: $' + newGame.getMoney();
            betOutputElement.textContent = 'Bet: $' + newGame.getBet();

         };


         // checkAce looks through an hand's array of cards to see if any of them are Aces, or to be more accurate,
         // if any of them equal 11 since 1's can't go lower. If any 11's are found, they're assumed to be Aces and their values are changed to 1's.
         // checkAce is used in checkVals for when player/dealer busts.
         checkAce = function (hand) {
            var count;

            for (count = 0; count < hand.getNumCards(); count += 1) {
               // If hand has busted and Ace = 11, make Ace = 1
               if (hand.cardVals[count].getNumber() === 11 && hand.total() > 21) {
                  hand.cardVals[count].setNumber(1);
               // If Ace = 11 gets to 21, make Ace = 11
               } else if (hand.cardVals[count].getNumber() === 1 && hand.total() + 10 <= 21) {
                  hand.cardVals[count].setNumber(11);
               }
            }

            updateGame(true);
         };

         // gameEnd is only called from checkVals() as soon as a winner is found, who wins depends on value in result, message holds a string to be output.
         gameEnd = function (gameObj, result, message) {
            // Should call game.winBet() or .clearBet(true/false) depending on what's sent.
            // if result === 2, player got blackjack, result === 1 : player won, result === 0 : push, result === -1 : player lost, result === -2 : dealer got blackjack, player lost.
            // Player got blackjack, pay them at 3:2 odds.
            if (result === 2) {
               gameObj.addMoney(gameObj.getBet() * 1.5);
               gameObj.clearBet(true);
            // Player won normally, pay 1:1 odds.
            } else if (result === 1) {
               gameObj.winBet();
            // Player tied, give them their money back.
            } else if (result === 0) {
               gameObj.clearBet(false);
            // Player lost, don't give them back their bet money.
            } else if (result === -1) {
               gameObj.clearBet(true);
            // Dealer got blackjack, take money from player at 3:2 odds.
            } else if (result === -2) {
               gameObj.addMoney(-(gameObj.getBet() * 1.5));
               gameObj.clearBet(true);
            }
            // If player got a blackjack, make them stand so updateGame() shows second card.
            playerHand.setStood(true);

            // Makes instructions visible again, this is reversed in '#start-game' event listener.
            document.querySelector('#instructions').textContent = newGame.getPromptPlayer();
            // Allows interaction with Betting system, this is default setting, changed only when Start game is clicked.
            if (result === 2) {
               gameStart = true;
            } else {
               gameStart = false;
            }

            // Calls game.messageOutput() passing along win/loss/blackJack/tie message to be output.
            gameObj.messageOutput(message);
            // Update view while skipping call to checkVals as it would cause an infinite loop.
            updateGame(true);
         };

         checkVals = function (gameObj, playerObj, dealerObj) {
            // handVal is total playerHand value, if handVal > 21 the player has lost, else check if dealer stood, if so then check playerHand against dealerHand, whoever
            // has more points wins.
            // checks hand for Aces, makes Ace cards 1 if hand busts, and 11 if hand isn't going to bust as a result.
            checkAce(playerObj);
            checkAce(dealerObj);

            // Player got a Blackjack, they win immediately.
            if (playerObj.getNumCards() === 2 && playerObj.total() === 21 && dealerObj.total() !== 21) {
               // Player got a blackjack, give them their money.
               gameEnd(gameObj, 2, gameObj.getBlackJack() + ' ' + gameObj.getWin());
            // Dealer got a Blackjack, they win immediately.
            } else if (dealerObj.getNumCards() === 2 && dealerObj.total() === 21 && playerObj.total() !== 21) {
               gameEnd(gameObj, -2, gameObj.getBlackJack() + ' ' + gameObj.getLose());
            // Both players got BlackJack, immediate tie.
            } else if (dealerObj.getNumCards() === 2 && playerObj.total() === 21 && dealerObj.total() === 21) {
               gameEnd(gameObj, 0, gameObj.getBlackJack() + ' ' + gameObj.getTie);
            } else {
               // The hand either doesn't have an Ace or the Ace doesn't matter, Player busts.
               if (playerObj.total() > 21) {
                  gameEnd(gameObj, -1, gameObj.getLose());
               // Player gets to 21 and automatically wins.
               } else if (playerObj.total() === 21) {
                  gameEnd(gameObj, 1, gameObj.getWin());
               }

               // Check new total.
               if (dealerObj.total() > 21) {                     // Dealer busts.
                  gameEnd(gameObj, 1, gameObj.getWin());
               } else if (dealerObj.total() === 21) {
                  gameEnd(gameObj, -1, gameObj.getLose());
               }

               // No one has busted or got to 21, check if someone stood.
               if (dealerObj.getStood()) {
               // We only need to check for winners if dealer has stood, since he's set to stand at certain numbers it's possible he could stand and let the
               // player win. Check the total score of player and dealer's Hands to see who won.

                  if (playerObj.total() > dealerObj.total() && playerObj.total() <= 21) {       // Player wins.
                     gameEnd(gameObj, 1, gameObj.getWin());
                  } else if (playerObj.total() < dealerObj.total() && dealerObj.total() <= 21) {      // Player loses.
                     gameEnd(gameObj, -1, gameObj.getLose());
                  } else if (playerObj.total() === dealerObj.total() && playerObj.total() <= 21) {    // Tie.
                     gameEnd(gameObj, 0, gameObj.getTie());
                  }
               }
            }
         };

         hitButton = function () {
            setTimeout(function () {
               dealerHand.deal();
               updateGame(false);
               dealerMove();
            }, 1000);
         };

         standButton = function () {
            dealerHand.setStood(true);
            // updateGame() will call checkVals, should see if anyone has won the game.
            updateGame(false);
         };

         // Checks total of dealer's deck, dealer makes various moves depending on how close to 21 he is.
         // Consider moving this to a better place, mainly to get around scope issues with standButton and hitButton.
         dealerMove = function () {
            if (gameStart) {
               if (!dealerHand.getStood()) {
                  if (dealerHand.total() > 17) {
                     standButton();
                  } else if (dealerHand.total() === 17) {
                     checkAce(dealerHand);
                     if (dealerHand.total() < 17) {
                        hitButton();
                     } else {
                        // Else dealer's hand total = 17 with no way to bring total down, stand.
                        standButton();
                     }
                  } else {
                     hitButton();
                  }
               }
            }
         };


         document.querySelector('#start-game').addEventListener('click', function () {
            
            newGame = createGame(newGame.getMoney(), newGame.getBet());
            // if (gameStart is true, the player reset the game before ending it: clear bet, prompt user for new bets, and allow interaction with betting system 
            // by making gameStart false.
            if (gameStart) {
               gameEnd(newGame, 0, newGame.getPromptPlayer());
               //newGame.clearBet(false);
            // Makes instructions visible again, this is reversed in '#start-game' event listener.
               document.querySelector('#instructions').visible = false;
               // document.querySelector('#instructions').textContent = '';
               // Bet buttons now respond, card Buttons do not.
               //gameStart = false;
            // Else, game ended naturally and player has reset the game with new bets, make instructions disappear, create hand objects, and allow interaction with card buttons.
            } else {
               // Clears win/tie/loss/blackjack message for new game.
               // document.querySelector('#message').visible = false;
               document.querySelector('#message').textContent = 'Good luck!';
               // Makes instructions invisible while the player is in a game.
               // document.querySelector('#instructions').textContent = '';
               document.querySelector('#instructions').visible = false;

               // Create these objects from scratch for the new newGame.
               playerHand = createHand();
               playerHand.deal();


               dealerHand = createHand();
               dealerHand.deal();
               // Update everything else based on the new model state.
               updateGame(false);

               // Card buttons now respond, betting buttons do not.
               gameStart = true;
            }
         }, false);

            //document.querySelector('#hit').addEventListener('click', hitButton, false);
         document.querySelector('#hit').addEventListener('click', function () {
            if (gameStart) {
               playerHand.deal();
               updateGame(false);
            }
         }, false);

         document.querySelector('#stand').addEventListener('click', function () {
            if (gameStart) {
               playerHand.setStood(true);
               dealerMove();
            }
         }, false);

         document.querySelector('#double-down').addEventListener('click', function () {
            if (gameStart) {
               newGame.addBet(newGame.getBet());
               playerHand.deal();
               playerHand.setStood(true);
               updateGame(false);
               dealerMove();
            }
         }, false);

         document.querySelector('#raise-by-10').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(10);
               updateGame(true);
            }
         }, false);


         document.querySelector('#raise-by-50').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(50);
               updateGame(true);
            }
         }, false);

         document.querySelector('#raise-by-100').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(100);
               updateGame(true);
            }
         }, false);

         document.querySelector('#raise-by-1000').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(1000);
               updateGame(true);
            }
         }, false);


         document.querySelector('#lower-by-10').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(-10);
               updateGame(true);
            }
         }, false);


         document.querySelector('#lower-by-50').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(-50);
               updateGame(true);
            }
         }, false);

         document.querySelector('#lower-by-100').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(-100);
               updateGame(true);
            }
         }, false);

         document.querySelector('#lower-by-1000').addEventListener('click', function () {
            if (!gameStart) {
               newGame.addBet(-1000);
               updateGame(true);
            }
         }, false);
         updateGame(true);
      }());

   }());
}, false);
