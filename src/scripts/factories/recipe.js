/* eslint-disable no-unused-vars */
const { createDOMElement } = require('../utils/domBuilder')

module.exports = {
  createRecipeCard (data) {
    const { name, ingredients, time, description } = data
    let txtDescription = ''
    const getRecipeCardDOM = () => {
      const divCardCont = createDOMElement('div', null, [{ class: 'col ' }])
      const divCard = createDOMElement('div', divCardCont, [{ class: 'card border-0' }])
      const divPict = createDOMElement('div', divCard, [{ class: 'background-grey' }])
      const divCardBody = createDOMElement('div', divCard, [{ class: 'card-body bg-light' }])
      const cardTitle = createDOMElement('div', divCardBody, [{ class: 'card-title row' }])
      const titleColLeft = createDOMElement('p', cardTitle, [{ class: 'col-8 fs-5 lh-1' }], `${name}`)
      const titleColRight = createDOMElement('p', cardTitle, [{ class: 'col-4 text-end fs-5 fw-bold' }])
      titleColRight.innerHTML = '<i class="fa-regular fa-clock"></i> ' + `${time}` + ' min'
      const mainTextard = createDOMElement('div', divCardBody, [{ class: 'card-text row' }])
      const ingredList = createDOMElement('ul', mainTextard, [{ class: 'ingred-list col list-unstyled' }])
      let unit = ''
      let quantity = ''
      let quantitySeparator = ' : '
      ingredients.forEach(ingredient => {
        if (ingredient.unit) {
          unit = ingredient.unit
          if (unit === 'grammes' || unit === 'gr') { unit = 'g' }
          if (unit === 'cuillères à soupe' || unit === 'cuillère à soupe') { unit = 'c. à s.' }
          if (unit === 'cuillères à café' || unit === 'cuillère à café') { unit = 'c. à c.' }
        } else { unit = '' }
        if (ingredient.quantity) {
          quantity = ingredient.quantity
          quantitySeparator = ' : '
        } else {
          quantity = ''
          quantitySeparator = ''
        }
        txtDescription = description.substring(0, 180) + '...'
        const ingredItem = createDOMElement('li', ingredList, [{ class: 'fw-bold my-0 lh-1' }], `${ingredient.ingredient}` + quantitySeparator)
        const inbredQuantity = createDOMElement('span', ingredItem, [{ class: 'fw-normal my-0 lh-1' }], `${quantity}` + ' ' + `${unit}`)
      })
      const recipe = createDOMElement('p', mainTextard, [{ class: 'description col my-0 lh-1 ' }], `${txtDescription}`)
      return (divCardCont)
    }
    return { getRecipeCardDOM }
  }
}
