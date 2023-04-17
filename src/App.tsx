import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';

const time = 499
const c = new Cookies()
const timeFromCookie = c.get("time")

function App() {
  const [number,setNumber] = useState(timeFromCookie ? Number.parseInt(timeFromCookie) : time)
  const [isFirstRender,setIsFirstRender] = useState(true)
  const timer =  useRef<NodeJS.Timer>()
  const startTimer = () =>{
    return setInterval(()=>{
      setNumber((number) =>number - 1)
    },1000)
   
  }
  const handleClick :  React.MouseEventHandler<HTMLButtonElement> = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    if(number !== time)clearInterval(timer.current)
    setNumber(time)
  }
  useEffect(()=>{
    return(()=>{
      clearInterval(timer.current)
     
    })
  },[])
  useEffect(()=>{
    window.addEventListener("beforeunload", writeCookie);
    if(number === time || isFirstRender) {
      timer.current = startTimer() // first
      setIsFirstRender(false)
    } 
    if(number === 40) clearInterval(timer.current) //last
    return(()=>{
      window.removeEventListener("beforeunload", writeCookie);
    })
  },[number])
  const writeCookie = () =>{
    const c = new Cookies()
    c.set("time",number)
  }
  return (
    <div className="App" style={{position:'absolute',top:200}}>
      <p>{ number - 40 >= 100 ? Math.floor((number - 40) / 100) : 0 }:
        {number - 40 >= 100 ?  Math.floor((number -40) / 10) % 10 : 0 }
        {number % 10}
        </p>
      <button type='button' onClick={handleClick}>reset</button>
    </div>
  );
}

export default App;
