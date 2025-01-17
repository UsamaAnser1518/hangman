require('dotenv').config()
const { getGameParams, CheckGuess } = require('./api/index.js')
const { readDictionaryFile } = require('./utils/readFile.js')
const { prioritizeVowels } = require('./utils/prioritizeVowels.js')

const playHangman = async () => {
  try {
    const dictionary = readDictionaryFile('src/dummyData/word.txt')

    const { token, hangman } = await getGameParams()
    let correctWord = hangman.split('')

    console.log(
      '\n\n--------------------------------------------------------\n\n'
    )
    console.log('\t\tWelcome to Hangman game')
    console.log(
      '\n\n--------------------------------------------------------\n\n'
    )

    console.log('\nHere your hangman game', hangman, '\n\n')

    let filteredDictionary = dictionary.filter(w => w.length === hangman.length)

    let letters = prioritizeVowels(filteredDictionary)

    let correctLetters = []
    let incorrectLetters = []
    let guesses = 0


    do {
      const guess = letters.shift()
      guesses++
      console.log('guess: ', guess)

      const data = await CheckGuess(token, guess)

      let tempFilteredDictionary = new Set()

      if (data.correct) {
        console.log('Correct Guess!!')
        correctLetters.push(guess)
      
        let occurances = []
        data.hangman.split('').forEach((element, index) => {
          if (element === guess) {
            occurances.push(index)
            correctWord[index] = guess
          }
        })

        filteredDictionary.forEach((dictionaryItem) => {
          occurances.forEach((e) => {
            if (dictionaryItem[e] === guess) {
              tempFilteredDictionary.add(dictionaryItem)
            } else return
          })
        })
      } else {
        console.log('Wrong Guess!!')
        incorrectLetters.push(guess)
        filteredDictionary.forEach((item) => {
          if(!item.split('').includes(guess)) {
            tempFilteredDictionary.add(item)
          }
        })
      }

      filteredDictionary = [...tempFilteredDictionary]

      let temp = new Set()

      letters.forEach((l) => {
        filteredDictionary.forEach((e) => {
          if (e.split('').includes(l)) {
            temp.add(l)
            return
          }
        })
      })

      letters = [...temp]

      console.log('Dictionary: ', filteredDictionary)

      console.log('word: ', correctWord.join(''))
      console.log('====================================================')
    } while (correctWord.includes('_') && letters.length)

    console.log(`Guessed the word in ${guesses} guessess.`)
    console.log('correctLetters: ', correctLetters)
    console.log('incorrectLetters: ', incorrectLetters)
    console.log('----------------------------------')
    console.log('Word: ', correctWord.join(''))
    console.log('----------------------------------')
  } catch (error) {
    console.error('An error occurred during the game:', error.message)
  }
}

playHangman()
