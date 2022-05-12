import { within } from '@testing-library/dom'

export function render(html: string) {
  const container = document.createElement('div')
  container.innerHTML = html

  // Some tests may need to access the DOM directly e.g. using document.getElementById()
  // so we need to render the container into an actual document.body
  document.body.innerHTML = ''
  document.body.appendChild(container)

  return within(container)
}
