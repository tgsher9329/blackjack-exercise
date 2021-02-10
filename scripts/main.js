window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load

  const playerHandElement = document.querySelector("#player-hand")
  const dealerHandElement = document.querySelector("#dealer-hand")
  const dealerPoints = document.querySelector("#dealer-points")
  const playerPoints = document.querySelector("#player-points")
  const hitButton = document.querySelector("#hit-button")
  const dealButton = document.querySelector("#deal-button")
  const messageBox = document.querySelector("#messages")
  const standButton = document.querySelector("#stand-button")

  let dealerHand = []
  let playerHand = []
  let deck = []


  function shuffle(deck) {
    for (let i = deck.length -1; i > 0; i--) {
      let randInt = Math.floor(Math.random() * i)
      let temp = deck[i]
      deck[i] = deck[randInt]
      deck[randInt] = temp
    }
    return deck
  }



  
  function deal(deck, targetHand, targetHandElement, targetPointsElement) {
    
    targetHand.push(deck[0])
    newCardImage(deck, targetHandElement)
    setPoints(targetHand, targetPointsElement)
    deck.shift()
    

    if (checkBust(playerHand)) {
      messageBox.innerText = "You busted"
    }
    if (checkBust(dealerHand)) {
      messageBox.innerText = "The dealer busted"
    }
    
  }

  dealButton.addEventListener("click", function() {    
    console.log("we delt")
    deck = createDeck()
    deck = shuffle(deck)

    deal(deck, playerHand, playerHandElement, playerPoints)
    deal(deck, dealerHand, dealerHandElement, dealerPoints)
    deal(deck, playerHand, playerHandElement, playerPoints)
    deal(deck, dealerHand, dealerHandElement, dealerPoints)

    dealButton.disabled = true
  })


  hitButton.addEventListener("click", function() {
    console.log("you hit")
    deal(deck, playerHand, playerHandElement, playerPoints)
    deal(deck, dealerHand, dealerHandElement, dealerPoints)

    // if dealer "score" is less than 17 "hit" them
  })


  standButton.addEventListener("click", function() {
    let score = calculatePoints(dealerHand, dealerPoints)

    if (score < 17) {
      deal(deck, dealerHand, dealerHandElement, dealerPoints)
    }

  })

  function createDeck() {
    const suits = ["hearts", "clubs", "diamonds", "spades"]
    const ranks = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"]
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        deck.push({
          suit : suits[i],
          rank : ranks[j],
        })
      }
    }
    // shuffle() deck before return
    return deck
  }


  function newCardImage(deck, targetHandElement) {
    
    // get a card
    targetHandElement.innerHTML += (`<img src="images/${deck[0].rank}_of_${deck[0].suit}.png" alt="">`)
  }


  function calculatePoints(targetHand) {
    score = 0
    for (i = 0; i < targetHand.length; i++) {
      if (isNaN(targetHand[i].rank)) {
        if (targetHand[i].rank === "ace") {
          score += 11
        }
        else {
          score += 10
        }
      }
      else {
        score += parseInt(targetHand[i].rank, 10)
      }
    }
    return score
  }

  function setPoints(targetHand, pointElement) {
    pointElement.innerText = (`${calculatePoints(targetHand)}`)
  }

  function checkBust(hand) {


    if (calculatePoints(hand) > 21) {
      hitButton.disabled = true
      standButton.disabled = true
      return true
    }
    return false
    
  }

  // console.log(deck[0])
  // console.log(deck[0].suit)
  // console.log(deck[0].rank)
  
  
})