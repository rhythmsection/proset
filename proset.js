const deck = require('./deck')
const chalk = require('chalk')
const rlSync = require('readline-sync')
const { threeCardSet, fourCardSet, fiveCardSet, sixCardSet, sevenCardSet } = require('./comparison')

class ProSet {
  constructor () {
    this.actualSets = []
    this.deck = deck
    this.done = false
    this.draw = {}
    this.input = null
    this.state = ''
  }

  objectify (cards) {
    /*
    Helper object maker.
    TODO: Just store stuff like this to begin with?
    */
    const cardsObj = {}
    for (var dot of cards) {
      if (cardsObj[dot]) {
        cardsObj[dot] += 1
      } else {
        cardsObj[dot] = 1
      }
    }
    return cardsObj
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

    const dotArray = []

    for (var card of arr) {
      dotArray.push(...this.draw[card])
    }

    const dotObj = this.objectify(dotArray)

    for (var val in dotObj) {
      if (dotObj[val] % 2 !== 0) {
        return 'fail'
      }
    }

    return 'success'
  }

  find () {
    /*
    Find all available sets in the draw.
    TODO: Fix these functions
    */
    const threeCardSets = threeCardSet(this.draw)
    const fourCardSets = fourCardSet(this.draw)
    const fiveCardSets = fiveCardSet(this.draw)
    const sixCardSets = sixCardSet(this.draw)
    const sevenCardSets = sevenCardSet(this.draw)

    const allSets = [...threeCardSets, ...fourCardSets, ...fiveCardSets, ...sixCardSets, ...sevenCardSets]

    console.log('POSSIBLE SETS: ')
    for (var set of allSets) {
      console.log(set.split(''))
    }
  }

  handleInput () {
    /*
    Validate user input looking for possible set.
    */
    if (!this.input) {
      return 'badInput'
    }

    this.input = this.input.replace(/\s+/g, '').toLowerCase()

    if (this.input.match(/[0-9,]/)) {
      const keyArray = this.input.split(',')
      for (var key of keyArray) {
        if (parseInt(key) >= Object.keys(deck).length) {
          console.log('A value is out of bounds.')
          return 'badInput'
        }
      }

      return this.select(keyArray)
    } else if (this.input === 'help' || this.input === 'h') {
      this.find()
      return 'helped'
    } else {
      console.log('Sorry, could not read your input.')
      return 'badInput'
    }
  }

  run () {
    /*
    Main game running function.
    */

    const intro = `
  ${chalk.red('P')}${chalk.yellow('R')}${chalk.green('O')}${chalk.cyan('S')}${chalk.blue('E')}${chalk.magenta('T')}: A Game of Matching

  A set is any number of cards between 3 and 7 where there
  are totaled either an even number of a colored dot or none of
  that color dot.

  There is always a set in any given draw of seven cards from the deck.

  To submit a set, note the numbers below each card and submit
  in a comma separated list. (ex: 1,2,3)

  If you need help, you can type 'help' at the prompt and it will provide
  you with all of the sets in the given draw.
    `
    console.log(intro)
    this.input = this.deal()

    this.state = this.handleInput(this.input)

    while (!this.done) {
      switch (this.state) {
        case 'success':
          this.input = rlSync.question('You found a set! Play again? (y/n): ').toLowerCase()
          if (this.input === 'y') {
            this.input = this.deal()
            this.state = this.handleInput(this.input)
          } else {
            console.log('See ya!')
            this.done = true
          }

          break
        case 'fail':
          this.input = rlSync.question('That is not a set. Try again or enter q to quit: ').toLowerCase()

          if (this.input === 'q') {
            console.log('Bye!')
            this.done = true
          } else {
            this.state = this.handleInput(this.input)
          }

          break
        case 'helped':
          this.input = rlSync.question('Would you ACTUALLY like to play this time? Or just cheat? (y/n): ').toLowerCase()

          if (this.input === 'y') {
            this.input = this.deal()
            this.state = this.handleInput(this.input)
          } else {
            console.log('See ya!')
            this.done = true
          }

          break
        case 'badInput':
          this.input = rlSync.question('Try again or enter q to quit: ').toLowerCase()

          if (this.input === 'q') {
            console.log('Bye!')
            this.done = true
          } else {
            this.state = this.handleInput(this.input)
          }

          break
      }
    }
  }
}

const proset = new ProSet()
proset.run()
