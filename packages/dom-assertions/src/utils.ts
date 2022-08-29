export function elementToString(element: HTMLElement | SVGElement) {
  return `<${element.tagName.toLowerCase()}>`
}

export function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

export function getElementTagName(element: Element) {
  return element.tagName && element.tagName.toLowerCase()
}
