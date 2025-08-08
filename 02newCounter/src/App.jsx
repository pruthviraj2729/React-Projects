// import { useState } from 'react'

// import './App.css'

// function App() {
//   const [counter, setCounter] = useState(1);
//   // let counter = 15;  
//   let addValue = () => {
//    setCounter(counter + 1);
//    console.log(Math.random());
//   }

//   let remmoveValue = () => {
//     setCounter(counter - 1);
//     if(counter > 0) {
//       setCounter(counter -1);
//     } else {
//       alert ("Counter can't go below 0")
//     }
//   }

//   return (
//     <>
//     <h1>hello react</h1>
//     <h2>counter: {counter}</h2>

//     <button onClick={addValue} style={{cursor: 'pointer'}} >add {counter}</button>
//     <br />
//     <button onClick={remmoveValue} disabled={counter === 0} style={{cursor: 'pointer'}}>remove {counter}</button>

//     <h3>counter is: {counter}</h3>
//     </>
//   )
// }

// export default App

import React from "react";
import { useState } from "react";
import './app.css'

function App() {
  const[counter, setCounter] = useState(1)


  let addValue = () => {
    setCounter (counter+1)
  }

    let removeValue = () => {
    setCounter (counter-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Counter Project</h1>
        <div className="text-5xl font-extrabold text-purple-600 mb-8">{counter}</div>
        <div className="flex gap-4 w-full">
          <button
            onClick={addValue}
            className="flex-1 py-3 px-6 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
          <button
            onClick={removeValue}
            disabled={counter === 0}
            className="flex-1 py-3 px-6 rounded-lg bg-pink-500 text-white font-semibold text-lg shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default App