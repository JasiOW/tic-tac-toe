import React from 'react'
import Board from './Board'
import { useState, useEffect } from 'react'

const TicTacToe = () => {

  const[value,setValue]= useState(Array(9).fill(null))
  const[currentPlayer, setCurrentPlayer] = useState("X")
  const[winner, setWinner] = useState(null)
  const[isDrawMatch, setIsDrawMatch] = useState(false)


  const checkWinner = () => {
    const winIndexs = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i=0; i<winIndexs.length;i++){
        const[a,b,c] = winIndexs[i]
        if(value[a] === value[b] && value[a] === value[c]){
            return value[a]
        }
    }
    return null;
  }

  
  const handleclick=(index:number) => {
    if(value[index] === null && !winner && !isDrawMatch){
        const updateValue=[...value]
    updateValue[index] = currentPlayer
    setValue(updateValue)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
   
  }

  const isboardfull = () => {
    return value.every((square) => square!== null)
  }
  useEffect(() => {
    const newWinner = checkWinner()
    if(newWinner){
        setWinner(newWinner)
    } else if (isboardfull()){
        setIsDrawMatch(true)
    }
  })
  const handleX = () => {
    setCurrentPlayer('X')
  }
  const handle0 = () => {
    setCurrentPlayer('0')
  }
  const handleNewGame = () => {
    setValue(Array(9).fill(null))
    setWinner(null)
    setIsDrawMatch(false)
  }
  return (
    <div>
        <h1>TicTacToe</h1>
        <Board onClick={handleclick} value={value}/>
        {winner ? (
        <h1>Winner:{winner}</h1>
         ) : isDrawMatch ? (
        <h1>Draw Match</h1> 
         ) : ( 
        <h1>Player: {currentPlayer}</h1>
        )}
        <div>
         <h2>Select player : </h2>
        <button type="button" onClick={handleX}>X</button>
        <button type="button" onClick={handle0}>0</button>  
        </div>
        <br/>
        <button type="button" onClick={handleNewGame}>Start New Game</button>
    </div>
  )
}

export default TicTacToe