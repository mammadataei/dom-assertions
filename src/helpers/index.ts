export function elementToString(element: HTMLElement | SVGElement) {
  return `<${element.tagName.toLowerCase()}>`
}

export function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}
