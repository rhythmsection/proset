const deck = require('./deck')
const chalk = require('chalk')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

class ProSet {
  constructor () {
    this.deck = deck
    this.window = {}
  }

  deal () {
    this.window = {}
    const cardKeys = []
    let count = 0

    while (cardKeys.length < 7) {
      const cardKey = Math.floor(Math.random() * (Object.keys(this.deck).length - 1))

      if (!cardKeys.includes(cardKey)) {
        cardKeys.push(cardKey)
        count++
        this.window[count] = this.deck[cardKey]
      }
    }

    let top = ''
    let line1 = ''
    let line2 = ''
    let line3 = ''
    let bottom = ''
    let labels = ''

    for (var val in this.window) {
      const a = this.window[val].includes('a') ? chalk.red('+') : ' '
      const b = this.window[val].includes('b') ? chalk.yellow('+') : ' '
      const c = this.window[val].includes('c') ? chalk.green('+') : ' '
      const d = this.window[val].includes('d') ? chalk.cyan('+') : ' '
      const e = this.window[val].includes('e') ? chalk.blue('+') : ' '
      const f = this.window[val].includes('f') ? chalk.magenta('+') : ' '

      top = top + '┌────┐ '
      line1 = line1 + `│${a}  ${b}│ `
      line2 = line2 + `│${c}  ${d}│ `
      line3 = line3 + `│${e}  ${f}│ `
      bottom = bottom + '└────┘ '
      labels = labels + `   ${val}   `
    }
    console.log(top)
    console.log(line1)
    console.log(line2)
    console.log(line3)
    console.log(bottom)
    console.log(labels)
  }

  select (arr) {
    const dotObj = {}

    for (var card of arr) {
      for (var dot of this.window[card]) {
        if (dotObj[dot]) {
          dotObj[dot] += 1
        } else {
          dotObj[dot] = 1
        }
      }
    }

    for (var val in dotObj) {
      if (dotObj[val] % 2 !== 0) {
        console.log('That was not a set.')
        return
      }
    }

    console.log('Great job! You found a set.')
  }
}

// Prompt
const proset = new ProSet()
const intro = `
PROSET: A Game of Matching

A set is any number of cards between 2 and 7 where there
are totaled either an even number of a colored dot or none of
that color dot.

To submit a set, note the numbers below each card and submit
in a comma separated list. (ex: 1,2,3)
`
console.log(intro)
proset.deal()

// clean this up.
// how do i make this recursive?

readline.question(
  'Create a set (separate choices with commas): '
  , values => {
    if (values && values.match(/^[0-9,]/)) {
      const keyArray = values.split(',')
      for (var key of keyArray) {
        if (parseInt(key) >= Object.keys(deck).length) {
          console.log('A value is out of bounds.')
          readline.close()
          return
        }
      }

      proset.select(values.split(','))
    } else {
      console.log('Sorry, could not read your input.')
    }

    readline.close()
  }
)
