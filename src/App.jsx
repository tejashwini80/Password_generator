import { useState,useCallback, useEffect, useRef } from 'react'

function App() {
const [length,setLength]=useState(8)
const [numAllowed,setNum]=useState(false)
const [symAllowed,setSym]=useState(false)
const [Password,setPassword]=useState("")
const passwordRef=useRef(null)


const passGenerator=useCallback(()=>{
 let pass=""
 let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnqrstuvwxyz"
 if(numAllowed)str+="0123456789"
 if(symAllowed)str+="!@#$%^&*()_+-=?><,./{}[]~`''"
 for(let i=1;i<length;i++){
   let char=Math.floor(Math.random()*str.length+1)
   pass+=str.charAt(char)
 }
 setPassword(pass) 
},[length,numAllowed,symAllowed,setPassword])

const PasswordCopy=useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(Password)
},[Password])
//optimization with outside effects
useEffect(()=>{
  passGenerator()
}, [length,numAllowed,symAllowed,passGenerator])

  return (
    <>
     
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-5 py-6 my-2 text-slate-50 text-3xl  bg-indigo-500'>
        
      <h2 className='text-5xl w-full text-center rounded-lg mx-auto py-10 border-2 border-spacing-3 max-w-lg border-indigo-600 bg-indigo-400 text-slate-50 mb-10'>Password Generator</h2>

    <div className='flex text-slate-30 shadow rounded-lg bg-indigo-100 overflow-hidden mb-4'>
      <input type='text' value={Password}  className='outline-none w-full py-1 px-3 text-blue-800 bg-indigo-90'placeholder='Password' readOnly 
      ref={passwordRef}/>

    <button
      onClick={PasswordCopy()}
     className='outline-none bg-indigo-700 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>


      <div className='flex text-sm gap-x-2 px-4 '>


          <div className='flex items-center gap-x-1 px-3'>
            <input type='range' min={6}max={100} value={length}
            className='cursor-pointer'  onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox' 
            id="numberInput"  defaultChecked={numAllowed}
            className='cursor-pointer px-2'  onChange={()=>{setNum((prev)=>!prev)}}/>
            <label>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type='checkbox' 
            id="symInput"  defaultChecked={symAllowed}
            className='cursor-pointer'  onChange={()=>{setSym((prev)=>!prev)}}/>
            <label>Symbols</label>
          </div>
      </div>
       <div id='btn' className='flex justify-center items-center bg-indigo-700 text-white-900 py-1 text-center rounded-lg px-1 text-xl mt-4 w-32' onClick={()=>{
         passGenerator()
      }}>
        <button>Generate</button>
      </div> 

      </div>
    </>
  )
}

export default App;