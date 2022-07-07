// GLOBAL VARIABLES

let playerSum = 0
let dealerSum = 0
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
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
    if (value === 'A') {
      return 11
    } else {
      return 10
    }
  }
  return parseInt(value)
}
const checkAce = () => {}

const displayCard = (card, div) => {
  let arr = card.split('-')
  let suit = arr[1]
  let num = arr[0]
  div.innerHTML = num
  if (suit === 's') {
    div.style.color = 'black'
  } else if (suit === 'h') {
    div.style.color = 'red'
  } else if (suit === 'c') {
    div.style.color = 'green'
  } else if (suit === 'd') {
    div.style.color = 'blue'
  }
}
// const displayCard = (card, div) => {
//   let arr = card.split('-')
//   let num = arr[0]
//   div.innerHTML = num
// }

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
    p1Card = deck.pop()
    displayCard(p1Card, p1)
    p2Card = deck.pop()
    displayCard(p2Card, p2)
    dealerSum += cardValue(dealerHidden)
    playerSum += cardValue(p1Card)
    playerSum += cardValue(p2Card)
    if (dealerSum < 17) {
      d2Card = deck.pop()
      dealerSum += cardValue(d2Card)
      displayCard(d2Card, d2)
    }
    if (playerSum < 21) {
      hit.addEventListener(
        'click',
        () => {
          p3Card = deck.pop()
          displayCard(p3Card, p3)
          playerSum += cardValue(p3Card)
          console.log(playerSum)
        },
        { once: true }
      )
    }

    console.log(dealerSum)
    console.log(playerSum)
  },
  { once: true }
)

stay.addEventListener('click', () => {
  console.log(deck.pop())
})

// hit.addEventListener(
//   'click',
//   () => {
//     if (playerSum <= 21) {
//       p3Card = deck.pop()
//       displayCard(p3Card, p3)
//     } else {
//       return
//     }
//     playerSum += cardValue(p3Card)
//   },
//   { once: true }
// )

reset.addEventListener('click', () => {})
