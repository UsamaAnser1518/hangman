const axios = require('axios')

const getGameParams = async () => {
  try {
    const { data } = await axios.post(process.env.API_URL)

    return data
  } catch (error) {
    console.error('Error getting game params:', error.message)
    throw error
  }
}

const CheckGuess = async (token, guess) => {
  try {
    const formData = new FormData()
    formData.append('token', token)
    formData.append('letter', guess)

    const { data } = await axios.put(process.env.API_URL, formData)

    return data
  } catch (error) {
    console.error('Error getting game params:', error.message)
    throw error
  }
}

module.exports = {
  getGameParams,
  CheckGuess
}
