"use client"

import { useState } from "react"
import Display from "./Display"
import Button from "./Button"
import "./styles/Calculator.css"

const Calculator = () => {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="calculator-keypad">
        <div className="keys-function">
          <Button onClick={clearDisplay}>C</Button>
        </div>
        <div className="keys-operators">
          <Button onClick={() => performOperation("+")}>+</Button>
          <Button onClick={() => performOperation("-")}>-</Button>
          <Button onClick={() => performOperation("*")}>×</Button>
          <Button onClick={() => performOperation("/")}>÷</Button>
          <Button onClick={() => performOperation("=")}>=</Button>
        </div>
        <div className="keys-numbers">
          <Button onClick={() => inputDigit("7")}>7</Button>
          <Button onClick={() => inputDigit("8")}>8</Button>
          <Button onClick={() => inputDigit("9")}>9</Button>
          <Button onClick={() => inputDigit("4")}>4</Button>
          <Button onClick={() => inputDigit("5")}>5</Button>
          <Button onClick={() => inputDigit("6")}>6</Button>
          <Button onClick={() => inputDigit("1")}>1</Button>
          <Button onClick={() => inputDigit("2")}>2</Button>
          <Button onClick={() => inputDigit("3")}>3</Button>
          <Button onClick={() => inputDigit("0")}>0</Button>
          <Button onClick={inputDecimal}>.</Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
