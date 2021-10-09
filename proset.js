const deck = require('./deck')
const chalk = require('chalk')
const rlSync = require('readline-sync')

class ProSet {
  constructor () {
    this.deck = deck
    this.draw = {}
  }

  deal () {
    /*
    Choose seven random cards from the included deck and visualize them for the draw.
    */

    this.draw = {}
    const cardKeys = []
    let count = 0

    while (cardKeys.length < 7) {
      const cardKey = Math.floor(Math.random() * (Object.keys(this.deck).length - 1))

      if (!cardKeys.includes(cardKey)) {
        cardKeys.push(cardKey)
        count++
        this.draw[count] = this.deck[cardKey]
      }
    }

    let top = ''
    let line1 = ''
    let line2 = ''
    let line3 = ''
    let bottom = ''
    let labels = ''

    for (var val in this.draw) {
      const a = this.draw[val].includes('a') ? chalk.red('\u25CF') : ' '
      const b = this.draw[val].includes('b') ? chalk.yellow('\u25CF') : ' '
      const c = this.draw[val].includes('c') ? chalk.green('\u25CF') : ' '
      const d = this.draw[val].includes('d') ? chalk.cyan('\u25CF') : ' '
      const e = this.draw[val].includes('e') ? chalk.blue('\u25CF') : ' '
      const f = this.draw[val].includes('f') ? chalk.magenta('\u25CF') : ' '

      top = top + '┌──────┐ '
      line1 = line1 + `│ ${a}  ${b} │ `
      line2 = line2 + `│ ${c}  ${d} │ `
      line3 = line3 + `│ ${e}  ${f} │ `
      bottom = bottom + '└──────┘ '
      labels = labels + `    ${val}    `
    }
    console.log(top)
    console.log(line1)
    console.log(line2)
    console.log(line3)
    console.log(bottom)
    console.log(labels)

    return rlSync.question('Create a set (separate choices with commas): ')
  }

  select (arr) {
    /*
    Evaluate user selection of cards for possible set.
    */

    const dotObj = {}

    for (var card of arr) {
      for (var dot of this.draw[card]) {
        if (dotObj[dot]) {
          dotObj[dot] += 1
        } else {
          dotObj[dot] = 1
        }
      }
    }

    for (var val in dotObj) {
      if (dotObj[val] % 2 !== 0) {
        return 'fail'
      }
    }

    return 'success'
  }

  find () {
    /*
    TODO: Find all available sets in the draw.
    (Note: This is labor intensive without pre-generated list.)
    */
  }
}

const proset = new ProSet()
function runProSet () {
  /*
  Main game running function.
  */

  let done = false
  let state = ''
  const intro = `
PROSET: A Game of Matching

A set is any number of cards between 2 and 7 where there
are totaled either an even number of a colored dot or none of
that color dot.

To submit a set, note the numbers below each card and submit
in a comma separated list. (ex: 1,2,3)
  `
  console.log(intro)
  let inputValues = proset.deal()

  state = validateSetInput(inputValues)

  while (!done) {
    switch (state) {
      case 'success':
        inputValues = rlSync.question('You found a set! Play again? (y/n): ')
        if (inputValues.toLowerCase() === 'y') {
          inputValues = proset.deal()
          state = validateSetInput(inputValues)
        } else {
          console.log('See ya!')
          done = true
        }

        break
      case 'fail':
        inputValues = rlSync.question('That is not a set. Try again or enter q to quit: ')

        if (inputValues.toLowerCase() === 'q') {
          console.log('Bye!')
          done = true
        } else {
          state = validateSetInput(inputValues)
        }

        break
      case 'badInput':
        inputValues = rlSync.question('Try again or enter q to quit: ')

        if (inputValues.toLowerCase() === 'q') {
          console.log('Bye!')
          done = true
        } else {
          state = validateSetInput(inputValues)
        }
    }
  }
}

function validateSetInput (input) {
  /*
  Validate user input looking for possible set.
  */

  if (input && input.match(/^[0-9,]/)) {
    const keyArray = input.split(',')
    for (var key of keyArray) {
      if (parseInt(key) >= Object.keys(deck).length) {
        console.log('A value is out of bounds.')
        return 'badInput'
      }
    }

    return proset.select(input.split(','))
  } else {
    console.log('Sorry, could not read your input.')
    return 'badInput'
  }
}

runProSet()
