const { getAllDatas } = require('../utils/api')
const domLinker = require('../utils/domLinker')
const factoryRecipes = require('../factories/recipe')

const displayRecipes = async recipes => {
  // console.log(recipes)
  recipes.forEach((recipe) => {
    const recipesModel = factoryRecipes.createRecipeCard(recipe)
    const recipeCardDOM = recipesModel.getRecipeCardDOM()
    domLinker.recipesContainer.appendChild(recipeCardDOM)
  })
}

const init = async () => {
  const recipes = await getAllDatas()
  console.log(recipes)
  displayRecipes(recipes)
}

init()
