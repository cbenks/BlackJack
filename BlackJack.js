// GLOBAL VARIABLES

let playerSum = 0
let dealerSum = 0
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a']
let suits = ['s', 'h', 'c', 'd']
let deck = []
const mes = document.querySelector('.message')
const start = document.querySelector('.start')
const stay = document.querySelector('.stay')
const hit = document.querySelector('.hit')
const reset = document.querySelector('.reset')
const d1 = document.querySelector('.card.d1')
const d2 = document.querySelector('.card.d2')
const d3 = document.querySelector('.card.d3')
const d4 = document.querySelector('.card.d4')
const d5 = document.querySelector('.card.d5')
const p1 = document.querySelector('.card.p1')
const p2 = document.querySelector('.card.p2')
const p3 = document.querySelector('.card.p3')
const p4 = document.querySelector('.card.p4')
const p5 = document.querySelector('.card.p5')
let ace = false
let dealerHidden = []

//FUNCTIONS
// resource: https://www.youtube.com/watch?v=bMYCWccL-3U

const buildDeck = () => {
  for (i = 0; i < values.length; i++) {
    for (x = 0; x < suits.length; x++) {
      deck.push(values[i] + '-' + suits[x])
    }
  }
}

const shuffleDeck = () => {
  for (i = 0; i < deck.length; i++) {
    let x = Math.floor(Math.random() * 52)
    let s = deck[i]
    deck[i] = deck[x]
    deck[x] = s
  }
}

// const randomCard = () => {
//   x = Math.floor(Math.random() * 52)
//   console.log(deck[x])
// }

const cardValue = (card) => {
  let arr = card.split('-')
  let value = arr[0]
  if (isNaN(value)) {
    if (value === 'a') {
      return 11
    } else {
      return 10
    }
  }
  return parseInt(value)
}

// Conditionals

if (playerSum > 21) {
  mes.innerHTML = 'You went over 21, you lose.'
}

if (playerSum === dealerSum) {
  mes.innerHTML = 'You are tied, it is a push.'
}

// Event Listeners

start.addEventListener(
  'click',
  () => {
    buildDeck()
    shuffleDeck()
    dealerHidden = deck.pop()
    dealerSum += cardValue(dealerHidden)
    if (dealerSum < 17) {
      d2Card = deck.pop()
      dealerSum += cardValue(d2Card)
      d2.innerHTML = cardValue(d2Card)
      console.log(d2Card)
      console.log(dealerSum)
      console.log(cardValue(dealerHidden))
    }
  },
  { once: true }
)

stay.addEventListener('click', () => {
  console.log(deck.pop())
})

hit.addEventListener('click', () => {})

reset.addEventListener('click', () => {})
