const { getAllDatas } = require('../utils/api')
const domLinker = require('../utils/domLinker')
const factoryRecipes = require('../factories/recipe')
const { regExPattern } = require('../utils/regExPaterns')

const displayRecipes = async recipes => {
  // console.log(recipes)
  recipes.forEach((recipe) => {
    const recipesModel = factoryRecipes.createRecipeCard(recipe)
    const recipeCardDOM = recipesModel.getRecipeCardDOM()
    domLinker.recipesContainer.appendChild(recipeCardDOM)
  })
}
const searchText = (searchField, recipes) => {
  if ((searchField.value !== '') && regExPattern.test(searchField.value)) {
    console.log(searchField.value)

    console.log(Object.values(recipes[0]))
    const search = searchField.value
    const res = recipes.filter(recipe => {
      Object.values(recipe).some(val => {
        val.includes(search)
      })
    })
    // const getMediasByPhotographerId = id => getMedias().then(medias => medias.filter(media => media.photographerId === id))
    // array.filter(o =>Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    console.log(res)
  }
}
const init = async () => {
  const recipes = await getAllDatas()
  // console.log(recipes)
  displayRecipes(recipes)

  domLinker.searchField.addEventListener('input', function () {
    searchText(domLinker.searchField, recipes)
  })
}

init()
