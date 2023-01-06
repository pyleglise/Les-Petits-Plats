const { getAllDatas, filterMainSearchBar } = require('../utils/api')
const { recipesContainer, searchField } = require('../utils/domLinker')
const factoryRecipes = require('../factories/recipe')
const { regExPattern } = require('../utils/regExPaterns')

const displayRecipes = async recipes => {
  // console.log(recipes)
  if (recipesContainer.innerHTML !== '') {
    recipesContainer.innerHTML = ''
  }
  recipes.forEach((recipe) => recipesContainer.appendChild(factoryRecipes.createRecipeCard(recipe).getRecipeCardDOM()))
}

const init = async () => {
  const recipes = await getAllDatas()
  displayRecipes(recipes)
  searchField.addEventListener('input', function () {
    // searchText(domLinker.searchField, recipes)
    if ((this.value !== '') && regExPattern.test(this.value)) {
      displayRecipes(filterMainSearchBar(recipes, this.value))
    }
  })
}

init()
