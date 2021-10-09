function objectify (cards) {
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

function validate (proposedSet, cardsObj) {
  for (var val in cardsObj) {
    if (cardsObj[val] % 2 !== 0 || new Set(proposedSet).size !== proposedSet.length) {
      return false
    }
  }
  return true
}

function threeCardSet (deck) {
  const actualSets = []

  for (var first in deck) {
    for (var second in deck) {
      for (var third in deck) {
        let valid = true
        const proposedSet = [first, second, third].sort()
        const proposedSetString = proposedSet.join('')
        const cardsObj = objectify([...deck[first], ...deck[second], ...deck[third]])

        valid = validate(proposedSet, cardsObj)

        if (valid && !actualSets.includes(proposedSetString)) {
          actualSets.push(proposedSetString)
        }
      }
    }
  }

  return actualSets
}

function fourCardSet (deck) {
  const actualSets = []

  for (var first in deck) {
    for (var second in deck) {
      for (var third in deck) {
        for (var fourth in deck) {
          let valid = true
          const proposedSet = [first, second, third, fourth].sort()
          const proposedSetString = proposedSet.join('')
          const cardsObj = objectify([...deck[first], ...deck[second], ...deck[third], ...deck[fourth]])

          valid = validate(proposedSet, cardsObj)

          if (valid && !actualSets.includes(proposedSetString)) {
            actualSets.push(proposedSetString)
          }
        }
      }
    }
  }

  return actualSets
}

function fiveCardSet (deck) {
  const actualSets = []
  for (var first in deck) {
    for (var second in deck) {
      for (var third in deck) {
        for (var fourth in deck) {
          for (var fifth in deck) {
            let valid = true
            const proposedSet = [first, second, third, fourth, fifth].sort()
            const proposedSetString = proposedSet.join('')
            const cardsObj = objectify([...deck[first], ...deck[second], ...deck[third], ...deck[fourth], ...deck[fifth]])

            valid = validate(proposedSet, cardsObj)

            if (valid && !actualSets.includes(proposedSetString)) {
              actualSets.push(proposedSetString)
            }
          }
        }
      }
    }
  }
  return actualSets
}

function sixCardSet (deck) {
  const actualSets = []
  for (var first in deck) {
    for (var second in deck) {
      for (var third in deck) {
        for (var fourth in deck) {
          for (var fifth in deck) {
            for (var sixth in deck) {
              let valid = true
              const proposedSet = [first, second, third, fourth, fifth, sixth].sort()
              const proposedSetString = proposedSet.join('')
              const cardsObj = objectify([...deck[first], ...deck[second], ...deck[third], ...deck[fourth], ...deck[fifth], ...deck[sixth]])

              valid = validate(proposedSet, cardsObj)

              if (valid && !actualSets.includes(proposedSetString)) {
                actualSets.push(proposedSetString)
              }
            }
          }
        }
      }
    }
  }
  return actualSets
}

function sevenCardSet (deck) {
  const actualSets = []
  let cardsArr = []
  const proposedSet = [1, 2, 3, 4, 5, 6, 7]
  const proposedSetString = proposedSet.join('')
  let valid = true

  for (var card in deck) {
    cardsArr = [...cardsArr + deck[card]]
  }

  const cardsObj = objectify(cardsArr)

  valid = validate(proposedSet, cardsObj)

  if (valid) {
    actualSets.push(proposedSetString)
  }
  return actualSets
}

module.exports = { threeCardSet, fourCardSet, fiveCardSet, sixCardSet, sevenCardSet, objectify }
