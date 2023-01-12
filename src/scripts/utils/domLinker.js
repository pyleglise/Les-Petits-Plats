module.exports = {
  recipesContainer: document.querySelector('.row.row-cols-1.row-cols-md-3.g-4'),
  searchField: document.querySelector('.form-control'),
  divIngredientMenu: document.querySelector('#collapse-ingredients'),
  divApplianceMenu: document.querySelector('#collapse-appliance'),
  divUstensilsMenu: document.querySelector('#collapse-ustensils'),
  ingredientMenu: document.querySelector('#collapse-ingredients > div > ul'),
  applianceMenu: document.querySelector('#collapse-appliance > div > ul'),
  ustensilsMenu: document.querySelector('#collapse-ustensils > div > ul'),
  ingredientsFilterBtn: document.querySelector('#heading-ingredients > button'),
  appliancesFilterBtn: document.querySelector('#heading-appliances > button'),
  ustensiblesFilterBtn: document.querySelector('#heading-ustensibles > button'),
  ingredientsFilterBtnArrow: document.querySelector('#heading-ingredients > i'),
  appliancesFilterBtnArrow: document.querySelector('#heading-appliances > i'),
  ustensiblesFilterBtnArrow: document.querySelector('#heading-ustensibles > i'),
  ingredientsFilterInput: document.getElementById('ingredientsFilter'),
  appliancesFilterInput: document.getElementById('appliancesFilter'),
  ustensiblesFilterInput: document.getElementById('ustensiblesFilter'),
  tagsContainer: document.querySelector('.d-flex.badges')
}
