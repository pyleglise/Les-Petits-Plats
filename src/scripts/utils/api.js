const axios = require('axios')
const bddFile = 'src/data/recipes.json'

/**
 * Get all recipes
 * @returns Array of database objects
 */
const getAllDatas = () => {
  return axios
    .get(bddFile, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        mode: 'cors'
      }
    })
    .then(res => res.data.recipes)
    .catch('Une erreur est survenue !')
}

module.exports = { getAllDatas }
