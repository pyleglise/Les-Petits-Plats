const axios = require('axios')
const bddFile = 'src/data/recipes.json'
const { axiosHeader } = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  mode: 'cors'
}

/**
 * Get all recipes
 * @returns Array of database objects
 */
const getAllDatas = () => axios.get(bddFile, { axiosHeader }).then(res => res.data.recipes).catch('An error occured when axios attempted to retrieve datas !')

/**
 * Get all sub properties translated to Capital First Letter (function capitalizeFirstLetter) and removing duplicates
 * @param {Array} array - Array of object (recipes)
 * @param {String} property1 - first property to list
 * @param {String} property2 - sub property (of the first property) to list. If empty, only the first property is listed
 * @returns Array of database objects
 */
const getAllSubProperies = (array, property1, property2) => {
  let flatArray = array.map(obj => obj[property1]).flat(1)
  if (property2) {
    flatArray = flatArray.map(obj => obj[property2])
  }
  flatArray = flatArray.map(obj => obj.toLowerCase()).map(obj => (obj = capitalizeFirstLetter(obj)))
  const filteredProperty = flatArray.filter((element, index) => flatArray.indexOf(element) === index)
  return filteredProperty
}

/**
 * Capitalize first letter of a string
 * @param {String} string - Array of object (recipes)
 * @returns String with first letter in capital
 */
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

/**
   * Determines whether an array (value1 in lower case) includes a certain value (value2 in lower case) among its entries,
   * returning true or false as appropriate.
   * @param {String} value1
   * @param {String} value2
   * @returns Boolean
   */
const isLowerCaseIncluded = (value1, value2) => value1.toLowerCase().includes(value2.toLowerCase())

/**
 * returns the first element in the provided array that satisfies the provided testing function (isIncluded function).
 * If no values satisfy the testing function, undefined is returned.
 * @param {Array} array - Array of object (recipes)
 * @param {String} property - Object property by example: 'description' or 'name'
 * @param {String} value - String to search
 * @returns Object || undefined
 */
const isFound = (array, property, value) => array.find(item => isLowerCaseIncluded(item[property], value))

/**
 * returns the array of the objects satisfying the value research in properties : name, description or ingredients
 * @param {Array} array - Array of object (recipes)
 * @param {String} value - String to search
 * @returns Object || undefined
 */
const filterMainSearchBar = (recipes, value) => recipes.filter(item =>
  isLowerCaseIncluded(item.description, value) ||
  isLowerCaseIncluded(item.name, value) ||
  isFound(item.ingredients, 'ingredient', value))

module.exports = { getAllDatas, isLowerCaseIncluded, isFound, filterMainSearchBar, getAllSubProperies }
