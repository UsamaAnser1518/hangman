const prioritizeVowels = (dictionary) => {
  const list = ['a', 'e', 'i', 'o', 'u']

  const remainingLetters = new Set()

  dictionary.forEach((e) => {
    e.split('').forEach((l) => {
      if (!list.includes(l)) remainingLetters.add(l.toLowerCase())
    })
  })

  return [...list, ...remainingLetters]
}

module.exports = {
  prioritizeVowels,
}
