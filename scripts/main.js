window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load

  const playerHandElement = document.querySelector("#player-hand")
  const dealerHandElement = document.querySelector("#dealer-hand")
  const hitButton = document.querySelector("#hit-button")
  const dealButton = document.querySelector("#deal-button")

  let dealerHand = []
  let playerHand = []





  let deck = createDeck()
  console.log(deck)
  console.log(shuffle(deck))


  function shuffle(deck) {
    let newDeck = []

    for (let i = 0; i < 52; i++) {
      let randInt = Math.floor(Math.random() * (deck.length))
      console.log(randInt)
      newDeck.push(deck[randInt])

      let current = deck[i]
      deck[i] = newDeck[i]
      deck.splice(randInt, 1)

      // deck.sort()
      // console.log(newDeck)

    }
    return newDeck
  }

  deal(createDeck(), playerHand)
  function deal(deck, targetHand) {

    deck.pop()
    // delete deck[3]
    // console.log(deck)

    // console.log(deck)
    // console.log(targetHand)
    
  }

  
  dealButton.addEventListener("click", function() {
    
    console.log("we delt")
    deal(newCard, playerHandElement)
    deal(newCard, dealerHandElement)
    deal(newCard, playerHandElement)
    deal(newCard, dealerHandElement)

  })

  hitButton.addEventListener("click", function() {

    console.log("you hit")
    deal(newCard, playerHandElement)

    // if dealer "score" is less than 17 "hit" them

  })

  function createDeck() {
    const deck = []
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


})