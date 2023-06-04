/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Calculator from './Calculator'

describe('Calculator', () => {
  it('No crashes when rendering', () => {
    render(<Calculator />)
  })

  it('number button click displays text', () => {
    render(<Calculator />)
    const numberButton = screen.getByText('1')
    fireEvent.click(numberButton)
    const textone = screen.queryAllByText('1')[0]
    expect(textone.tagName.toLowerCase()).toBe('div')
    expect(textone).toBeInTheDocument()
  })

  it('two decimal point are not allowed', () => {
    render(<Calculator />)
    const numberButton = screen.getByText('1')
    const pointButton = screen.getByText('.')
    fireEvent.click(numberButton)
    fireEvent.click(pointButton)
    fireEvent.click(numberButton)
    fireEvent.click(pointButton)
    const textone = screen.queryAllByText('1.1')[0]
    expect(textone.tagName.toLowerCase()).toBe('div')
    expect(textone).toBeInTheDocument()
  })

  it('more than 9 characters not allowed to be clicked, counting the minus', () => {
    render(<Calculator />)
    const numberButton = screen.getByText('1')
    const minusButton = screen.getByText('-')
    fireEvent.click(minusButton)
    for (let i = 0; i < 10; i += 1) {
      fireEvent.click(numberButton)
    }
    const textone = screen.queryAllByText('-11111111')[0]
    expect(textone).toBeInTheDocument()
  })

  it('more than 9 characters not allowed to be clicked, counting the point', () => {
    render(<Calculator />)
    const numberButton = screen.getByText('1')
    const pointButton = screen.getByText('.')
    fireEvent.click(numberButton)
    fireEvent.click(pointButton)
    for (let i = 0; i < 9; i += 1) {
      fireEvent.click(numberButton)
    }
    const textone = screen.queryAllByText('1.1111111')[0]
    expect(textone.tagName.toLowerCase()).toBe('div')
    expect(textone).toBeInTheDocument()
  })

  it('number sign change does not change the result', () => {
    render(<Calculator />)
    const numberOneButton = screen.getByText('1')
    const numberTwoButton = screen.getByText('2')
    const numberThreeButton = screen.getByText('3')
    const plusminusButton = screen.getByText('+/-')
    const multiplyButton = screen.getByText('x')
    const sumButton = screen.getByText('+')

    fireEvent.click(numberOneButton)
    fireEvent.click(multiplyButton)
    fireEvent.click(numberThreeButton)
    fireEvent.click(sumButton)
    fireEvent.click(numberTwoButton)
    fireEvent.click(plusminusButton)

    const textone = screen.queryAllByText('1')[0]
    const texttwo = screen.getByText('-2')
    expect(textone.tagName.toLowerCase()).toBe('div')
    expect(textone).toBeInTheDocument()
    expect(texttwo).toBeInTheDocument()
  })

  it('after ninth digit, more numbers are not recognized', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('0'))
    const textInScreen = screen.queryAllByText('123456789')[0]
    expect(textInScreen).toBeInTheDocument()
  })

  it('"ERROR" display for numbers greater than 999999999', () => {
    render(<Calculator />)
    const nineButton = screen.getByText('9')
    for (let i = 0; i < 9; i += 1) {
      fireEvent.click(nineButton)
    }
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    const textInScreen = screen.getByText('ERROR')
    expect(textInScreen).toBeInTheDocument()
  })

  it('"ERROR" display for negative numbers', () => {
    render(<Calculator />)
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('='))
    const textInScreen = screen.queryAllByText('ERROR')[0]
    expect(textInScreen).toBeInTheDocument()
  })
  
  it('module operation, 16%7=2', () => {
    render(<Calculator />)
    const oneButton = screen.getByText('1')
    const sixButton = screen.getByText('6')
    const sevenButton = screen.getByText('7')
    const moduleButton = screen.getByText('%')
    fireEvent.click(oneButton)
    fireEvent.click(sixButton)
    fireEvent.click(moduleButton)
    fireEvent.click(sevenButton)

    const textInScreen = screen.queryAllByText('2')[0]
    expect(textInScreen).toBeInTheDocument()
    expect(textInScreen.tagName.toLowerCase()).toBe('div')
  })
})
