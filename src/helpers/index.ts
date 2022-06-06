export function elementToString(element: HTMLElement | SVGElement) {
  return `<${element.tagName.toLowerCase()}>`
}
