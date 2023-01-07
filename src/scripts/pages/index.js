const { getAllDatas, filterMainSearchBar, getAllSubProperties, filterArray } = require('../utils/api')
const { recipesContainer, searchField, ingredientMenu, applianceMenu, ustensilsMenu } = require('../utils/domLinker')
const { createDOMElement } = require('../utils/domBuilder')
const factoryRecipes = require('../factories/recipe')
const { regExPattern } = require('../utils/regExPaterns')

/**
 * Display, in the DOM recipesContainer the list of the recipes in the array recipes
 * @param {Array} recipes - array of object (recipes)
 * @returns null
 */
const displayRecipes = async recipes => {
  if (recipesContainer.innerHTML !== '') recipesContainer.innerHTML = ''
  recipes.forEach((recipe) => recipesContainer.appendChild(factoryRecipes.createRecipeCard(recipe).getRecipeCardDOM()))
}

/**
 * Display, in the DOM parentMenu the list of the items in the array menuItems
 * @param {Object} parentMenu - parent DOM object (ul) where to display the <li> items
 * @param {Array} menuItems - array items
 * @returns null
 */
const displayItemsMenu = (parentMenu, menuItems) => {
  if (parentMenu.innerHTML !== '') parentMenu.innerHTML = ''
  menuItems.forEach((item) => createDOMElement('li', parentMenu, [{ class: 'list-group-item' }], item))
}

/**
 * Refresh or display the menu elements and menu cards according to the research field input
 * @param {Object} recipes - array of object (recipes) filtered
 * @param {Array} ingredients - array of items (ingredients) filtered
 * @param {Array} ustensils - array of items (ustensils) filtered
 * @param {Array} appliances - array of items (appliances) filtered
 * @returns null
 */
const refreshResultElement = (recipes, ingredients, ustensils, appliances) => {
  displayItemsMenu(ingredientMenu, ingredients)
  displayItemsMenu(ustensilsMenu, ustensils)
  displayItemsMenu(applianceMenu, appliances)
  displayRecipes(recipes)
}

const init = async () => {
  const recipes = await getAllDatas()
  const ingredients = getAllSubProperties(recipes, 'ingredients', 'ingredient')
  const ustensils = getAllSubProperties(recipes, 'ustensils')
  const appliances = getAllSubProperties(recipes, 'appliance')
  refreshResultElement(recipes, ingredients, ustensils, appliances)
  searchField.addEventListener('input', function () {
    if ((this.value !== '') && regExPattern.test(this.value)) {
      const filteredRecipes = filterMainSearchBar(recipes, this.value)
      if (filteredRecipes.length > 0) {
        refreshResultElement(filteredRecipes, filterArray(ingredients, this.value), filterArray(ustensils, this.value), filterArray(appliances, this.value))
      } else {
        recipesContainer.innerHTML = '<p>Aucune recette ne correspond à votre critère… <br>Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>'
      }
    } else refreshResultElement(recipes, ingredients, ustensils, appliances)
  })
}

init()
