

window.addEventListener('DOMContentLoaded', function() {
  function deal(deck, target) {
    // remove a card from the deck and store it in the 'currentCard' variable
    const currentCard = deck.pop();
    // give that card to the target hand
    target.push(currentCard);
  }
  
  function getCardImage(card) {
    // create a new img element
    const cardImage = document.createElement('img');
    // set the src attribute
    if (card.rank === 1) { // 1 = ace
      cardImage.setAttribute('src', `images/ace_of_${card.suit}.png`);
    } else if (card.rank === 11) { // 11 = jack
      cardImage.setAttribute('src', `images/jack_of_${card.suit}.png`);
    } else if (card.rank === 12) { // 12 = queen
      cardImage.setAttribute('src', `images/queen_of_${card.suit}.png`);
    } else if (card.rank === 13) { // 13 = king
      cardImage.setAttribute('src', `images/king_of_${card.suit}.png`);
    } else { // otherwise, it's a number card
      cardImage.setAttribute('src', `images/${card.rank}_of_${card.suit}.png`);
    }
    // return the newly created card image
    return cardImage
  }
  
  function render(isGameOver) {
    // find the dealer hand and player hand elements
    const dealerHandElement = document.querySelector('#dealer-hand');
    const playerHandElement = document.querySelector('#player-hand');
    // since we're going to re-render the cards, we can reset the contents
    dealerHandElement.innerHTML = ''
    playerHandElement.innerHTML = ''
  
    // for each card in the dealer hand
    for (let index = 0; index < dealerHand.length; index++) {
      // find the current card that we are working with
      const card = dealerHand[index];
      // create a new card image element
      const cardElement = getCardImage(card)
      // append it to the dealer hand element
      dealerHandElement.appendChild(cardElement);
    }
    // do the same for the player hand
    for (let index = 0; index < playerHand.length; index++) {
      const card = playerHand[index];
      const cardElement = getCardImage(card)
      playerHandElement.appendChild(cardElement);
    }
  
    // calculate the player points
    const playerPoints = calculatePoints(playerHand);
    // put the points on the page
    document.querySelector('#player-points').textContent = playerPoints;
    
    // do the same for the dealer
    const dealerPoints = calculatePoints(dealerHand);
    document.querySelector('#dealer-points').textContent = dealerPoints;
  
    // if we told the render function that the game is over
    if (isGameOver) {
      // find the hit button and the stand button
      const hitButton = document.querySelector('#hit-button');
      const standButton = document.querySelector('#stand-button');
      // and disable them
      hitButton.setAttribute('disabled', true);
      standButton.setAttribute('disabled', true);
    }
  }
  
  function generateDeck() {
    // set up an empty deck
    let deck = [];
  
    // set up our suits
    const suits = [
      'clubs',
      'spades',
      'hearts',
      'diamonds'
    ]
  
    // for each suit
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      // find the suit we are working with
      const suit = suits[suitIndex];
      // for each rank from 1 - 13
      for (let rank = 1; rank <= 13; rank++) {
        // create a new card object
        const card = {
          rank: rank,
          suit: suit,
        };
        // then push it into the deck array
        deck.push(card);
      }
    }
    // shuffle the deck array
    shuffle(deck)
    // then return the shuffled deck
    return deck;
  }
  
  function shuffle(deck) {
    // for each card in the deck
    for (let i = 0; i < deck.length; i++) {
      // create a random number (which we will use as an index) between 0 and i
      // (i starts at 0 and increases until we reach the length of the array)
      const randIndex = Math.floor(Math.random() * i);
      // get the card at position i and store the value in a temporary variable
      const temporary = deck[i]
      // reassign the card at position i with a card in another random spot
      deck[i] = deck[randIndex];
      // reassign the card at the position we pulled the random card from
      // the card we stored in the temporary variable earlier
      deck[randIndex] = temporary;
      // repeat until we get to the end of the deck
    }
  }
  
  function calculatePoints(deck) {
    let points = 0;
    let aces = 0;
  
    // for each card in the hand
    for (let i = 0; i < deck.length; i++) {
      // find the current card
      const currentCard = deck[i];
  
      // if the card is greater than 1 or less than 11, we can just use the
      // actual value
      if (currentCard.rank > 1 && currentCard.rank < 11) {
        // so increase the points by whatever the value of the card is
        points += currentCard.rank;
      // if it is greater than 11, it's a face card
      } else if (currentCard.rank >= 11) {
        // so we always add 10 for face cards
        points += 10;
      // if it is an ace, we need to handle a little differently
      } else if (currentCard.rank === 1) {
        // we start by increasing the ace count for every ace we see
        aces++;
        // then we assume the ace is worth 11
        points += 11;
      }
    }
  
    // for as long as the points are > 21 (bust) and as long as we have aces to count
    while (points > 21 && aces > 0) {
      // subtract 10 points from the total (changing the ace value back to 1 point
      // instead of 11 points)
      points -= 10;
      // and remove 1 ace from the count
      aces--;
    }
  
    // at the end, if there are no more aces then the points is the correct value
  
    // so we return the points
    return points;
  }
  
  function checkBusts() {
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);
  
    // check busts (points > 21)
    if (playerPoints > 21) {
      message('Player Bust. Dealer Wins');
      isGameOver = true;
    } else if (dealerPoints > 21) {
      message('Dealer Bust. Player Wins');
      isGameOver = true;
    }
  }
  
  function checkWinner() {
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);
    
    // check points (higher value)
    if (dealerPoints > playerPoints) {
      message('Dealer Wins')
      isGameOver = true;
    } else if (dealerPoints < playerPoints) {
      message('Player Wins')
      isGameOver = true;
    } else if (dealerPoints === playerPoints) {
      message('Draw')
      isGameOver = true;
    }
  }
  
  function message(text) {
    // update the textContent of the message box with the text passed in
    document.querySelector('#messages').textContent = text
  }

  // ------------------- GAME LOGIC -------------------
  let isGameOver = false;
  let dealerHand = [];
  let playerHand = [];
  let gameDeck = generateDeck();

  // find the deal button
  const dealButton = document.querySelector('#deal-button');
  // listen for the click event
  dealButton.addEventListener('click', function() {
    // disable the deal button
    dealButton.setAttribute('disabled', true);
    // deal to the dealer and the player
    deal(gameDeck, playerHand);
    deal(gameDeck, dealerHand);
    deal(gameDeck, playerHand);
    deal(gameDeck, dealerHand);
    
    // calculate the points
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);

    // player has 21
    if (playerPoints === 21 && dealerPoints < 21) {
      message('Player has 21. Player wins');
      isGameOver = true;
    }
    render();
  })

  // find the hit button
  const hitButton = document.querySelector('#hit-button');
  // add the click event
  hitButton.addEventListener('click', function() {
    // deal to the player
    deal(gameDeck, playerHand);
    // if the dealer points are less than 17
    if (calculatePoints(dealerHand) < 17) {
      // they must take another card
      deal(gameDeck, dealerHand);
    }
    // check if anyone busted
    checkBusts();
    render();
  })

  // find the stand button
  const standButton = document.querySelector('#stand-button');
  // add the click event
  standButton.addEventListener('click', function() {
    // if the dealer points are less than 17
    if (dealerPoints < 17) {
      // they must take another card
      deal(gameDeck, dealerHand);
    }
    // check if anyone has won
    checkWinner();
    render();
  })
})
