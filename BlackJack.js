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
const pScore = document.querySelector('.pScore')
const dScore = document.querySelector('.dScore')
let ace = false
let dealerHidden = []
let playerScore = 0
let dealerScore = 0

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

const cardValue = (card) => {
  let arr = card.split('-')
  let value = arr[0]
  if (isNaN(value)) {
    if (value === 'A') {
      if (playerSum + 11 > 21) {
        return 1
      } else {
        return 11
      }
    } else {
      return 10
    }
  }
  return parseInt(value)
}

const displayCard = (card, div) => {
  let arr = card.split('-')
  let suit = arr[1]
  let num = arr[0]
  div.innerHTML = num
  div.style.backgroundColor = 'white'
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

const checkWin = () => {
  if (playerSum == 21) {
    stay.style.opacity = '50%'
    stay.removeEventListener('click', stayFunction)
    mes.innerHTML = 'BLACKJACK! You win!'
  } else if (playerSum > 21) {
    stay.style.opacity = '50%'
    stay.removeEventListener('click', stayFunction)
    mes.innerHTML = 'You went over 21, you lose.'
  }
}

const stayCheckWin = () => {
  if (dealerSum === playerSum) {
    mes.innerHTML = 'You are tied. It is a push'
  } else if (dealerSum > 21) {
    mes.innerHTML = 'Dealer busts - You win'
  } else {
    if (playerSum < 22 && playerSum > dealerSum) {
      mes.innerHTML = 'You beat the dealer'
    } else if (dealerSum === 21) {
      mes.innerHTML = 'Dealer makes 21 - you lose'
    } else if (dealerSum > playerSum) {
      mes.innerHTML = 'Dealer has higher score - You lose'
    }
  }
}

const dealerTurn = () => {
  displayCard(dealerHidden, d1)
  if (dealerSum < 17) {
    d3Card = deck.pop()
    setTimeout(displayCard, 500, d3Card, d3)
    dealerSum += cardValue(d3Card)
    if (dealerSum < 17) {
      d4Card = deck.pop()
      setTimeout(displayCard, 1000, d4Card, d4)
      dealerSum += cardValue(d4Card)
      if (dealerSum < 17) {
        d5Card = deck.pop()
        setTimeout(displayCard, 1500, d5Card, d5)
        dealerSum += cardValue(d5Card)
      }
    }
  }
}

const stayFunction = () => {
  dealerTurn()
  stayCheckWin()
}

const keepScore = () => {
  if (playerSum > 21) {
    dealerScore += 1
  } else if (playerSum === 21) {
    playerScore += 1
  } else if (dealerSum > 21) {
    playerScore = +1
  } else if (dealerSum === 21) {
    dealerScore += 1
  } else if (playerSum < 21) {
    if (playerSum === dealerSum) {
      return
    } else if (playerSum > dealerSum) {
      playerScore += 1
    } else if (playerSum < dealerSum) {
      dealerScore += 1
    }
  }
}

// const checkAce = () => {
//   let arr = card.split('-')
//   let value = arr[0]
//   if (value === 'A' && playerSum < 21) {
//     return 1
//   }
// }

const startGame = () => {
  start.addEventListener(
    'click',
    () => {
      mes.innerHTML = 'Stay or Hit?'
      buildDeck()
      shuffleDeck()
      stay.addEventListener('click', stayFunction, { once: true })
      dealerHidden = deck.pop()
      d2Card = deck.pop()
      p1Card = deck.pop()
      p2Card = deck.pop()
      setTimeout(displayCard, 500, d2Card, d2)
      setTimeout(displayCard, 1000, p1Card, p1)
      setTimeout(displayCard, 1500, p2Card, p2)
      dealerSum += cardValue(dealerHidden)
      playerSum += cardValue(p1Card)
      playerSum += cardValue(p2Card)
      dealerSum += cardValue(d2Card)
      checkWin()
      if (playerSum < 21) {
        hit.addEventListener(
          'click',
          () => {
            p3Card = deck.pop()
            setTimeout(displayCard, 500, p3Card, p3)
            playerSum += cardValue(p3Card)
            checkWin()
            if (playerSum < 21) {
              hit.addEventListener(
                'click',
                () => {
                  p4Card = deck.pop()
                  setTimeout(displayCard, 500, p4Card, p4)
                  playerSum += cardValue(p4Card)
                  checkWin()
                  if (playerSum < 21) {
                    hit.addEventListener(
                      'click',
                      () => {
                        p5Card = deck.pop()
                        setTimeout(displayCard, 500, p5Card, p5)
                        playerSum += cardValue(p5Card)
                        checkWin()
                      },
                      { once: true }
                    )
                  }
                },
                { once: true }
              )
            }
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}
startGame()
reset.addEventListener('click', () => {
  keepScore()
  dScore.innerHTML = `Dealer:${dealerScore}`
  pScore.innerHTML = `Player:${playerScore}`
  dealerSum = 0
  playerSum = 0
  mes.innerHTML = 'Click Start to play again'
  d1.innerHTML = ''
  d2.innerHTML = ''
  d3.innerHTML = ''
  d4.innerHTML = ''
  d5.innerHTML = ''
  p1.innerHTML = ''
  p2.innerHTML = ''
  p3.innerHTML = ''
  p4.innerHTML = ''
  p5.innerHTML = ''
  d1.style.backgroundColor = 'black'
  d2.style.backgroundColor = 'black'
  d3.style.backgroundColor = 'black'
  d4.style.backgroundColor = 'black'
  d5.style.backgroundColor = 'black'
  p1.style.backgroundColor = 'black'
  p2.style.backgroundColor = 'black'
  p3.style.backgroundColor = 'black'
  p4.style.backgroundColor = 'black'
  p5.style.backgroundColor = 'black'
  stay.style.opacity = '100%'
  startGame()
})
