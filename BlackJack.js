// GLOBAL VARIABLES

let playerSum = 0
let dealerSum = 0
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a']
let suits = ['s', 'h', 'c', 'd']
let deck = []

//FUNCTIONS

const buildDeck = () => {
  for (i = 0; i < values.length; i++) {
    for (x = 0; x < suits.length; x++) {
      deck.push(values[i] + '-' + suits[x])
    }
  }
}

const shuffleDeck = () => {
  for (i = 0; i < deck.length; i++) {
    x = Math.floor(Math.random() * 52)
    deck[i] = deck[x]
  }
  console.log(deck)
}

const randomCard = () => {
  x = Math.floor(Math.random() * 52)
  console.log(deck[x])
}

buildDeck()
shuffleDeck()
