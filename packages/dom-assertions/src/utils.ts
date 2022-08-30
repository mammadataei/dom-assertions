export function elementToString(element: HTMLElement | SVGElement) {
  return `<${element.tagName.toLowerCase()}>`
}

export function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

export function getElementTagName(element: Element) {
  return element.tagName && element.tagName.toLowerCase()
}

export function toSentence(
  array: Array<string>,
  { wordConnector = ', ', lastWordConnector = ' and ' } = {},
) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : '',
  )
}
