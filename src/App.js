import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  const passwordref=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllow) str += '1234567890';
    if (charAllow) str += "`!@#$%^^&*''||()}{[]?/|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [setPassword, length, charAllow, numberAllow]);


  const copypass=useCallback(()=>{
       
    window.navigator.clipboard.writeText(password)

  },[password])
useEffect(()=>{


passwordGenerator()

},[length,numberAllow,charAllow,passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordref}
        />
        <button className="outline-none bg-blue-700 text-white px-3 px-0.5 shrink-0" 
        onClick={copypass}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={0}
            max={100}
            value={length}
            className="cursor-pointer mb-2 gap-x-2"
       
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label className='mb-2' htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 mb-2'>
        <input type="checkbox"
        defaultChecked={numberAllow}
        id='numberInput'
        onChange={()=>{
          setNumberAllow((prev)=>!prev)
        }}
        />
<label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 mb-2'>
        <input type="checkbox"
        defaultChecked={charAllow}
        id='charInput'
        onChange={()=>{
          charAllow((prev)=>!prev)
        }}
        />
<label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
