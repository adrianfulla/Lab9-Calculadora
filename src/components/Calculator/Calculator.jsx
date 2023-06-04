import { useEffect, useState } from 'react'
import { evaluate } from 'mathjs'
import CKeys from '../CKeys'
import Characters from '../Characters'
import {
  calculatorShowText,
  calculatorResult,
  calculatorContainer,
} from './Calculator.module.css'

const Calculator = () => {
  const [textInline, setTextInline] = useState('0')
  const [textHidden, setTextHidden] = useState('')
  const [result, setResult] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [lastOp, setLastOp] = useState(true)
  const [countNum, setCountNum] = useState(0)
  const [hasPoint, setPoint] = useState(false)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (textHidden.length > 0) {
      if (showResult) {
        try {
          const resp = evaluate(textHidden)
          if (resp < 0 || resp > 999999999 || `${resp}`.length > 9) {
            setResult('ERROR')
          } else {
            setResult(resp)
          }
        } catch (error) {
          setResult('ERROR')
        }
      }
    }
  }, [textHidden, showResult])

  const handleObtainKey = (value, type) => {
    if (value !== Characters.POINT || !hasPoint) {
      if (type === 'number') {
        let text = textInline
        if (textInline === '0') {
          text = ''
        }

        if (reset) {
          text = ''
          setReset(false)
        }
        setCountNum(countNum + 1)
        setLastOp(false)
        if (value === Characters.POINT && !hasPoint && countNum < 9) {
          if (lastOp) {
            setTextHidden(`${textHidden}0${value}`)
            setTextInline(`${text}0${value}`)
            setCountNum(countNum + 1)
            setPoint(true)
          } else {
            setTextHidden(textHidden + value)
            setTextInline(text + value)
            setPoint(true)
          }
          setShowResult(true)
        } else if (countNum < 9) {
          setTextHidden(textHidden + value)
          setTextInline(text + value)
          setShowResult(true)
        }
      } else if (type === 'operation') {
        if (lastOp) {
          const text = `${textHidden}`
          if (text[text.length - 1] === '-' && text[text.length - 2] === '+') {
            setCountNum(countNum - 1)
            setTextHidden(text.slice(0, -2))
          } else {
            setTextHidden(text.slice(0, -1))
          }
        }

        setLastOp(true)
        setReset(true)
        setShowResult(false)
        setPoint(false)
        setCountNum(0)

        switch (value) {
          case Characters.DIVIDE:
            setTextHidden(`${textHidden}/`)
            break
          case Characters.MULTIPLY:
            setTextHidden(`${textHidden}*`)
            break
          case Characters.MINUS:
            setTextHidden(`${textHidden}+-`)
            setTextInline('-')
            setCountNum(1)
            setReset(false)
            break
          default:
            setTextHidden(`${textHidden}${value}`)
        }
      } else if (type === 'equal') {
        if (result !== 'ERROR') {
          setShowResult(true)
          setTextInline(result)
          setTextHidden(result)
        } else {
          setShowResult(true)
          setTextInline('')
          setTextHidden('')
        }
      } else if (value === Characters.AC) {
        setTextInline('0')
        setTextHidden('')
        setLastOp(true)
        setResult('')
        setCountNum(0)
        setReset(false)
      } else if (value === Characters.PERCENT) {
        if (!lastOp) {
          setTextHidden(textHidden + value)
          setTextInline(textInline + value)
        }
      } else if (value === Characters.PARENTESIS) {
        if (textInline !== '0') {
          if (textInline[0] === '-') {
            const newTextNeg = textInline.slice(1)
            const textRe = `${textHidden}`.replace(
              new RegExp(`${textInline}$`),
              '',
            )
            setTextHidden(textRe + newTextNeg)
            setTextInline(newTextNeg)
            setCountNum(countNum - 1)
          } else {
            const newTextNeg = `-${textInline}`
            const regex = new RegExp(`${textInline}$`)
            const textRe = `${textHidden}`.replace(regex, '')
            setTextHidden(textRe + newTextNeg)
            setTextInline(newTextNeg)
            setCountNum(countNum + 1)
          }
        }
      }
    }
  }

  return (
    <div className={calculatorContainer}>
      <div className={calculatorShowText}>{textInline}</div>
      <div className={calculatorResult}>{showResult ? result : null}</div>
      <CKeys setScreen={(vl, ty) => handleObtainKey(vl, ty)} />
    </div>
  )
}

export default Calculator
