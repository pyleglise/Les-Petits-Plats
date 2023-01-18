const bootstrap = require('bootstrap')
const {
  getAllDatas, filterMainSearchBar, getAllSubProperties, filterArray, filterIngredientSearch, filterApplianceSearch,
  filterUstensibleSearch
} = require('../utils/api')
const {
  sectionFiltres, sectionRecipes, recipesContainer, searchField, ingredientMenu, applianceMenu, ustensilsMenu,
  divIngredientMenu, divApplianceMenu, divUstensilsMenu, afterSearchBar,
  ingredientsFilterBtn, appliancesFilterBtn, ustensiblesFilterBtn,
  ingredientsFilterInput, appliancesFilterInput, ustensiblesFilterInput,
  ingredientsFilterBtnArrow, appliancesFilterBtnArrow, ustensiblesFilterBtnArrow,
  tagsContainer
} = require('../utils/domLinker')
const { createDOMElement } = require('../utils/domBuilder')
const factoryRecipes = require('../factories/recipe')
const { regExPattern } = require('../utils/regExPaterns')
const { tags } = require('../utils/states')
const divIngredientMenuCollapse = new bootstrap.Collapse(divIngredientMenu, { toggle: false })
const divApplianceMenuCollapse = new bootstrap.Collapse(divApplianceMenu, { toggle: false })
const divUstensilsMenuCollapse = new bootstrap.Collapse(divUstensilsMenu, { toggle: false })

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
const displayItemsMenu = (parentMenu, menuItems, recipes) => {
  if (parentMenu.innerHTML !== '') parentMenu.innerHTML = ''
  menuItems.forEach((item) => {
    const itemDOM = createDOMElement('li', parentMenu, [{ class: 'list-group-item' }], item)
    itemDOM.addEventListener('click', () => addTag(parentMenu.parentNode.parentNode.getAttribute('id').split('collapse-').pop(), item, itemDOM, recipes))
  })
}

/**
 * Add tag of the item selected in the dropdown and remove it from dropdown
 * @param {DOMObject} parent -  DOM object parent menu
 * @param {String} element - element to add as a tag
 * @param {DOMObject} itemDOM - DOM item selected, to remove from the dropdown menu
 * @returns null
 */
const addTag = (parent, element, itemDOM, recipes) => {
  if (!tags[parent].includes(element)) {
    tags[parent].push(element)
    itemDOM.style.display = 'none'
    const tagsItem = createDOMElement('button', tagsContainer, [{ type: 'button' }, { class: 'btn btn-primary bg-color-' + parent }], element)
    const closeBtnTagItem = createDOMElement('i', tagsItem, [{ class: 'bi-x-circle' }])
    closeBtnTagItem.addEventListener('click', () => {
      tags[parent] = tags[parent].filter(item => item !== element)
      filterWithTags(recipes)
      tagsContainer.removeChild(tagsItem)
      itemDOM.removeAttribute('style')
      itemDOM.addEventListener('click', () => addTag(parent, element, itemDOM, recipes))
    })
  } else tags[parent] = tags[parent].filter(item => item !== element)
  filterWithTags(recipes)
}

/**
 * Filter the item recipes and menus depending on the tags selected
 * @param {array} recipes -  all the recipes to be filtered
 * @returns null
 */
const filterWithTags = async (recipes) => {
  if (tags.ingredients.length === 0 && tags.ustensils.length === 0 && tags.appliance.length === 0) {
    recipes = await getAllDatas()
  }
  let filteredRecipes = recipes
  tags.ingredients.forEach((ingredient) => { filteredRecipes = filterIngredientSearch(filteredRecipes, ingredient) })
  tags.appliance.forEach((appliance) => { filteredRecipes = filterApplianceSearch(filteredRecipes, appliance) })
  tags.ustensils.forEach((ustensible) => { filteredRecipes = filterUstensibleSearch(filteredRecipes, ustensible) })
  const ingredients = getAllSubProperties(filteredRecipes, 'ingredients', 'ingredient')
  const ustensils = getAllSubProperties(filteredRecipes, 'ustensils')
  const appliances = getAllSubProperties(filteredRecipes, 'appliance')
  if (ingredients.length === 0) {
    closeDropDownMenu(ingredientsFilterBtnArrow, divIngredientMenuCollapse)
  }
  if (ustensils.length === 0) closeDropDownMenu(ustensiblesFilterBtnArrow, divUstensilsMenuCollapse)
  if (appliances.length === 0) closeDropDownMenu(appliancesFilterBtnArrow, divApplianceMenuCollapse)
  refreshResultElement(filteredRecipes, ingredients, ustensils, appliances)
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
  sectionFiltres.style.removeProperty('display')
  sectionRecipes.style.removeProperty('display')
  afterSearchBar.innerHTML = ''
  displayItemsMenu(ingredientMenu, ingredients, recipes)
  displayItemsMenu(ustensilsMenu, ustensils, recipes)
  displayItemsMenu(applianceMenu, appliances, recipes)
  displayRecipes(recipes)
}

/**
 * Toggle the drop down menu arrow up or down
 * @param {DOMObject} filterBtnArrowDOM - DOm of the arrow menu
 * @returns null
 */
const toggleDropDownArrow = (filterBtnArrowDOM) => {
  if (!filterBtnArrowDOM.classList.contains('collapsed')) {
    filterBtnArrowDOM.classList.remove('fa-angle-up')
    filterBtnArrowDOM.classList.add('fa-angle-down')
  } else {
    filterBtnArrowDOM.classList.add('fa-angle-up')
    filterBtnArrowDOM.classList.remove('fa-angle-down')
  }
  refreshDropDownArrow()
}

/**
 * Refresh the drop down menus
 * @returns null
 */
const refreshDropDownArrow = () => {
  [ingredientsFilterBtnArrow, appliancesFilterBtnArrow, ustensiblesFilterBtnArrow].forEach(filterBtnArrowDOM => {
    if (!filterBtnArrowDOM.classList.contains('collapsed')) {
      filterBtnArrowDOM.classList.remove('fa-angle-up')
      filterBtnArrowDOM.classList.add('fa-angle-down')
    } else {
      filterBtnArrowDOM.classList.add('fa-angle-up')
      filterBtnArrowDOM.classList.remove('fa-angle-down')
    }
  })
}

/**
 * Display the drop down menu of the category
 * @param {DOMObject} filterBtnArrowDOM - DOm of the filter button
 * @param {DOMObject} divMenuCollapse - bootstrap objet to uncollapse
 * @returns null
 */
const openDropDownMenu = (filterBtnArrowDOM, divMenuCollapse) => {
  if (filterBtnArrowDOM.classList.contains('collapsed')) {
    // divMenuCollapse.classList.add('show')
    divMenuCollapse.toggle()
    refreshDropDownArrow()
  }
}

/**
 * Close the drop down menu of the category
 * @param {DOMObject} filterBtnArrowDOM - DOm of the filter button
 * @param {DOMObject} divMenuCollapse - bootstrap objet to uncollapse
 * @returns null
 */
const closeDropDownMenu = (filterBtnArrowDOM, divMenuCollapse) => {
  if (!filterBtnArrowDOM.classList.contains('collapsed')) {
    divMenuCollapse.toggle()
    // divMenuCollapse.classList.remove('show')
    refreshDropDownArrow()
  }
}

/**
 * Display the search input field instead of the dropdown button
 * @param {DOMObject} filterBtnDOM - DOm of the filter button
 * @param {DOMObject} filterInputDOM - DOm oinput field
 * @returns null
 */
const displaySearchBtn = (filterBtnDOM, filterInputDOM) => {
  filterBtnDOM.style.display = 'none'
  filterInputDOM.style.display = 'inline'
  filterInputDOM.focus()
}

/**
 * Close the search input field and display the dropdown button
 * @param {DOMObject} filterBtnDOM - DOm of the filter button
 * @param {DOMObject} filterInputDOM - DOm oinput field
 * @param {Object} eEsc - char input in the field to look for Escape
 * @returns null
 */
const closeSearchBtn = (filterBtnDOM, filterInputDOM, eEsc, filterBtnArrowDOM, divMenuCollapse) => {
  if ((eEsc && (eEsc.key === 'Escape' || eEsc.key === 'Esc')) || (!filterInputDOM.value)) {
    filterBtnDOM.style.display = 'flex'
    filterInputDOM.style.display = 'none'
    closeDropDownMenu(filterBtnArrowDOM, divMenuCollapse)
  }
}

/**
 * Initialize the eventListeners
 * @param {array} recipes - array of the recipes
 * @param {array} ingredients - array of the ingredients
 * @param {array} ustensils - array of the ustensils
 * @param {array} appliances - array of the appliances
 * @returns null
 */
const setEventListenners = (recipes, ingredients, ustensils, appliances) => {
  searchField.addEventListener('input', function () {
    if (this.value !== '') {
      if (regExPattern.test(this.value)) {
        const filteredRecipes = filterMainSearchBar(recipes, this.value)
        if (filteredRecipes.length > 0) {
          refreshResultElement(filteredRecipes, filterArray(ingredients, this.value), filterArray(ustensils, this.value), filterArray(appliances, this.value))
        } else {
          afterSearchBar.innerHTML = 'Aucune recette ne correspond à votre recherche...<br>Vous pouvez chercher « tarte aux pommes », « poisson », etc.'
          sectionFiltres.style.display = 'none'
          sectionRecipes.style.display = 'none'
        }
      } else afterSearchBar.innerHTML = 'Entrez au moins trois caractères'
    } else refreshResultElement(recipes, ingredients, ustensils, appliances)
  })

  ingredientsFilterInput.addEventListener('input', function () {
    if ((this.value !== '') && regExPattern.test(this.value)) {
      openDropDownMenu(ingredientsFilterBtnArrow, divIngredientMenuCollapse)

      const filteredRecipes = filterIngredientSearch(recipes, this.value)
      refreshResultElement(filteredRecipes, filterArray(ingredients, this.value), ustensils, appliances)
    } else refreshResultElement(recipes, ingredients, ustensils, appliances)
  })
  appliancesFilterInput.addEventListener('input', function () {
    if ((this.value !== '') && regExPattern.test(this.value)) {
      openDropDownMenu(appliancesFilterBtnArrow, divApplianceMenuCollapse)

      refreshResultElement(recipes, ingredients, ustensils, filterArray(appliances, this.value))
    } else refreshResultElement(recipes, ingredients, ustensils, appliances)
  })
  ustensiblesFilterInput.addEventListener('input', function () {
    if ((this.value !== '') && regExPattern.test(this.value)) {
      openDropDownMenu(ustensiblesFilterBtnArrow, divUstensilsMenuCollapse)

      refreshResultElement(recipes, ingredients, filterArray(ustensils, this.value), appliances)
    } else refreshResultElement(recipes, ingredients, ustensils, appliances)
  })

  ingredientsFilterBtnArrow.addEventListener('click', () => toggleDropDownArrow(ingredientsFilterBtnArrow))
  appliancesFilterBtnArrow.addEventListener('click', () => toggleDropDownArrow(appliancesFilterBtnArrow))
  ustensiblesFilterBtnArrow.addEventListener('click', () => toggleDropDownArrow(ustensiblesFilterBtnArrow))

  ingredientsFilterBtn.addEventListener('click', () => displaySearchBtn(ingredientsFilterBtn, ingredientsFilterInput))
  ingredientsFilterInput.addEventListener('keyup', eEsc => closeSearchBtn(ingredientsFilterBtn, ingredientsFilterInput, eEsc, ingredientsFilterBtnArrow, divIngredientMenuCollapse))
  ingredientsFilterInput.addEventListener('focusout', () => closeSearchBtn(ingredientsFilterBtn, ingredientsFilterInput, undefined, ingredientsFilterBtnArrow, divIngredientMenuCollapse))

  appliancesFilterBtn.addEventListener('click', () => displaySearchBtn(appliancesFilterBtn, appliancesFilterInput))
  appliancesFilterInput.addEventListener('keyup', eEsc => closeSearchBtn(appliancesFilterBtn, appliancesFilterInput, eEsc, appliancesFilterBtnArrow, divApplianceMenuCollapse))
  appliancesFilterInput.addEventListener('focusout', () => closeSearchBtn(appliancesFilterBtn, appliancesFilterInput, undefined, appliancesFilterBtnArrow, divApplianceMenuCollapse))

  ustensiblesFilterBtn.addEventListener('click', () => displaySearchBtn(ustensiblesFilterBtn, ustensiblesFilterInput))
  ustensiblesFilterInput.addEventListener('keyup', eEsc => closeSearchBtn(ustensiblesFilterBtn, ustensiblesFilterInput, eEsc, ustensiblesFilterBtnArrow, divUstensilsMenuCollapse))
  ustensiblesFilterInput.addEventListener('focusout', () => closeSearchBtn(ustensiblesFilterBtn, ustensiblesFilterInput, undefined, ustensiblesFilterBtnArrow, divUstensilsMenuCollapse))
}

const init = async () => {
  const recipes = await getAllDatas()
  const ingredients = getAllSubProperties(recipes, 'ingredients', 'ingredient')
  const ustensils = getAllSubProperties(recipes, 'ustensils')
  const appliances = getAllSubProperties(recipes, 'appliance')
  refreshResultElement(recipes, ingredients, ustensils, appliances)
  setEventListenners(recipes, ingredients, ustensils, appliances)
}

init()
