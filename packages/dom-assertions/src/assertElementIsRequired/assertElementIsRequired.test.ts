import { render } from '../../testing'
import { assertElementIsRequired } from './assertElementIsRequired'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementIsRequired(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should pass for required supported input types', () => {
  const { getByLabelText } = render(`
    <label for="text">text</label>
    <input type="text" id="text" required/>
    
    <label for="search">search</label>
    <input type="search" id="search" required/>
    
    <label for="url">url</label>
    <input type="url" id="url" required/>
    
    <label for="tel">tel</label>
    <input type="tel" id="tel" required/>

    <label for="email">email</label>
    <input type="email" id="email" required/>
    
    <label for="password">password</label>
    <input type="password" id="password" required/>
    
    <label for="date">date</label>
    <input type="date" id="date" required/>
    
    <label for="month">month</label>
    <input type="month" id="month" required/>
    
    <label for="week">week</label>
    <input type="week" id="week" required/>
    
    <label for="time">time</label>
    <input type="time" id="time" required/>
    
    <label for="datetime-local">datetime-local</label>
    <input type="datetime-local" id="datetime-local" required/>
    
    <label for="number">number</label>
    <input type="number" id="number" required/>
    
    <label for="checkbox">checkbox</label>
    <input type="checkbox" id="checkbox" required/>
    
    <label for="radio">radio</label>
    <input type="radio" id="radio" required/>
    
    <label for="file">file</label>
    <input type="file" id="file" required/>
  `)

  expect(assertElementIsRequired(getByLabelText('text')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('search')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('url')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('tel')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('email')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('password')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('date')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('month')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('week')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('time')).pass).toEqual(true)
  expect(
    assertElementIsRequired(getByLabelText('datetime-local')).pass,
  ).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('number')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('checkbox')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('radio')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('file')).pass).toEqual(true)
})

it('should fail for not-required supported input types', () => {
  const { getByLabelText } = render(`
    <label for="text">text</label>
    <input type="text" id="text" />
    
    <label for="search">search</label>
    <input type="search" id="search" />
    
    <label for="url">url</label>
    <input type="url" id="url" />
    
    <label for="tel">tel</label>
    <input type="tel" id="tel" />

    <label for="email">email</label>
    <input type="email" id="email" />
    
    <label for="password">password</label>
    <input type="password" id="password" />
    
    <label for="date">date</label>
    <input type="date" id="date" />
    
    <label for="month">month</label>
    <input type="month" id="month" />
    
    <label for="week">week</label>
    <input type="week" id="week" />
    
    <label for="time">time</label>
    <input type="time" id="time" />
    
    <label for="datetime-local">datetime-local</label>
    <input type="datetime-local" id="datetime-local" />
    
    <label for="number">number</label>
    <input type="number" id="number" />
    
    <label for="checkbox">checkbox</label>
    <input type="checkbox" id="checkbox" />
    
    <label for="radio">radio</label>
    <input type="radio" id="radio" />
    
    <label for="file">file</label>
    <input type="file" id="file" />
  `)

  expect(assertElementIsRequired(getByLabelText('text'))).toEqual({
    pass: false,
    message: 'Expected the <input> element to be required.',
    negatedMessage: 'Expected the <input> element not to be required.',
    expected: '',
    received: '<input> is not required',
  })
  expect(assertElementIsRequired(getByLabelText('search')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('url')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('tel')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('email')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('password')).pass).toEqual(
    false,
  )
  expect(assertElementIsRequired(getByLabelText('date')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('month')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('week')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('time')).pass).toEqual(false)
  expect(
    assertElementIsRequired(getByLabelText('datetime-local')).pass,
  ).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('number')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('checkbox')).pass).toEqual(
    false,
  )
  expect(assertElementIsRequired(getByLabelText('radio')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('file')).pass).toEqual(false)
})

it('should not pass for unsupported input types', () => {
  const { getByLabelText } = render(`
    <label for="color">color</label>
    <input type="color" id="color" required/>
    
    <label for="range">range</label>
    <input type="range" id="range" required/>
    
    <label for="submit">submit</label>
    <input type="submit" id="submit" required/>
    
    <label for="image">image</label>
    <input type="image" id="image" required alt=""/>
    
    <label for="reset">reset</label>
    <input type="reset" id="reset" required/>
    
    <input type="hidden" id="hidden" required aria-label="hidden"/>
  `)

  expect(assertElementIsRequired(getByLabelText('color')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('range')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('submit')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('image')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('reset')).pass).toEqual(false)
  expect(assertElementIsRequired(getByLabelText('hidden')).pass).toEqual(false)
})

it('should pass for required supported elements', () => {
  const { getByRole, getByLabelText } = render(`
    <label for="select">select</label>
    <select id="select" required>
    
    <textarea required></textarea>
  `)

  expect(assertElementIsRequired(getByLabelText('select')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('textbox')).pass).toEqual(true)
})

it('should fail for not-required supported elements', () => {
  const { getByRole, getByLabelText } = render(`
    <label for="select">select</label>
    <select id="select">
    
    <textarea></textarea>
  `)

  expect(assertElementIsRequired(getByLabelText('select'))).toEqual({
    pass: false,
    message: 'Expected the <select> element to be required.',
    negatedMessage: 'Expected the <select> element not to be required.',
    expected: '',
    received: '<select> is not required',
  })
  expect(assertElementIsRequired(getByRole('textbox')).pass).toEqual(false)
})

it('should pass for supported elements with aria-required="true"', () => {
  const { getByLabelText } = render(`
    <label for="text">text</label>
    <input type="text" id="text" aria-required="true" />
    
    <label for="select">select</label>
    <select id="select" aria-required="true">
    
    <textarea id="textarea" aria-required="true" aria-label="textarea"></textarea>
  `)

  expect(assertElementIsRequired(getByLabelText('text')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('select')).pass).toEqual(true)
  expect(assertElementIsRequired(getByLabelText('textarea')).pass).toEqual(true)
})

it('should pass for inputs with both required and aria-required="true"', () => {
  const { getByLabelText } = render(`
    <label for="text">text</label>
    <input type="text" id="text" required aria-required="true" />
  `)

  expect(assertElementIsRequired(getByLabelText('text')).pass).toEqual(true)
})

it('should pass for elements with supported roles and aria-required="true"', () => {
  const { getByRole } = render(`
    <div role="checkbox" aria-required="true" />
    <div role="combobox" aria-required="true" />
    <div role="gridcell" aria-required="true" />
    <div role="listbox" aria-required="true" />
    <div role="radiogroup" aria-required="true" />
    <div role="spinbutton" aria-required="true" />
    <div role="textbox" aria-required="true" />
    <div role="tree" aria-required="true" />
  `)

  expect(assertElementIsRequired(getByRole('checkbox')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('combobox')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('gridcell')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('listbox')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('radiogroup')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('spinbutton')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('textbox')).pass).toEqual(true)
  expect(assertElementIsRequired(getByRole('tree')).pass).toEqual(true)
})

it('should fail for unsupported roles with aria-required="true"', () => {
  const { getByRole } = render(`
    <div role="button" aria-required="true" />
    <div role="dialog" aria-required="true" />
    <div role="form" aria-required="true" />
    <div role="grid" aria-required="true" />
    <div role="list" aria-required="true" />
    <div role="menu" aria-required="true" />
    <div role="menubar" aria-required="true" />
  `)

  expect(assertElementIsRequired(getByRole('button')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('dialog')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('form')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('grid')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('list')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('menu')).pass).toEqual(false)
  expect(assertElementIsRequired(getByRole('menubar')).pass).toEqual(false)
})
