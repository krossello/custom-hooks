import { useState } from "react"

export const useCounter = (initialValue = 10) => {

  const [counter, setCounter] = useState(initialValue)  

  const increment = () => {
    setCounter( counter + 1 )
  }

  const decrement = () => {
    if ( counter === 0) return;
    
    setCounter( counter - 1 )
  }

  const reset = () => {
    setCounter( 0 )
  }

  return {
    counter,
    increment,
    decrement,
    reset
  }
  
}
