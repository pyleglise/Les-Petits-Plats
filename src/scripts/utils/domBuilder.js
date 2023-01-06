function createDOMElement (tag, parent, attributes = [], content) {
  const element = document.createElement(tag)

  for (const attribute of attributes) {
    const key = Object.keys(attribute)
    element.setAttribute(key, attribute[key])
  }

  if (content) {
    element.textContent = content
  }
  if (parent) {
    parent.appendChild(element)
  }
  return element
}
module.exports = { createDOMElement }
