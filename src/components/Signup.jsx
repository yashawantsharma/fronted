import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [formdata,setFormdata]=useState({
    name:'',
    email:'',
    phone:'',
    password:'',
  })
  const navigate=useNavigate()
  const [error,setError]=useState({})
  // const navigate = useNavigate()
  const forml=(e)=>{
    e.preventDefault()
    
    // navigate("/")
    let result={}
    if(!formdata.name){
      result.name="* name is required"
    }
    if(!formdata.email){
      result.email="* Email is required"
    }
    if(!formdata.phone){
      result.phone="* Phone is required"
    }
    if(!formdata.password){
      result.password="* Passwoed is required"
    }
    setError(result)
    if(Object.keys(result).length===0){
      alert("submited successfully")
      localStorage.setItem("user",JSON.stringify(formdata))
      navigate("/login")
      setFormdata({
      name:'',
    email:'',
    phone:'',
    password:'',
      })
    }
  }
// bg-[url(bg2.png)]
  return (
    <div className=''>
      <form onSubmit={forml}>
              <div className=' text-center border-2  h-125 ml-90 mr-90 '>
        <h1 className=' mt-3 text-xl font-bold mt-10'>Sing up</h1>
        <div className='mt-3'>

            <label className='block'>UserName :-
            <input type="text" placeholder='Enter Username'
             className='border-1 rounded-full text-center mt-5 ml-5 p-1 w-70'
             value={formdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})}/>
             {error.name&&<p style={{color:"red"}}>{error.name}</p>}
        </label> 

        <label className='block'>Email   :-
            <input type="email" placeholder='Enter Email'
             className='border-1 rounded-full text-center mt-5 ml-13 p-1 w-70'
             value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})}/>
             {error.email&&<p style={{color:"red"}}>{error.email}</p>}
        </label>

        <label className='block'>Phone :-
            <input type="number" placeholder='Enter Email'
             className='border-1 rounded-full text-center mt-5 ml-11 p-1 w-70 '
             value={formdata.phone} onChange={(e)=>{setFormdata({...formdata,phone:e.target.value})}}/>
             {error.phone&&<p style={{color:"red"}}>{error.phone}</p>}
        </label>

        <label className='block'>Password :-
            <input type="password" placeholder='Enter Email' className='border-1 rounded-full text-center mt-5 p-1 w-70 ml-6'
            value={formdata.password} onChange={(e)=>{setFormdata({...formdata,password:e.target.value})}}/>
            {error.password&&<p style={{color:"red "}}>{error.password}</p>}
        </label>

        <button type='submit' className='rounded-full border-1 mt-5 p-3 w-30'><b>Submit</b></button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Signup
