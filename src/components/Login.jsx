import React, { useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'

const Login = ({setLogin}) => {
  const [formdata,setFormdata]=useState({
      name:'',
      password:'',
    })
  
    const [error,setError]=useState({})
    const navigate = useNavigate()
    const forml=(e)=>{
      e.preventDefault()

      const result=JSON.parse(localStorage.getItem("user"))
      setFormdata({
        name:'',
      password:'',
        })
      if(!(result.name===formdata.name)){
        alert ("name is not correct")
          return;
      }
      if(!(result.password===formdata.password)){
        alert("password is not correct")
            return;
      }
      else{
            alert("submit successfully")
             sessionStorage.setItem("login",JSON.stringify(formdata))
            
            // setLogin(true)
            navigate("/")
            
             return;
          }
      
    }
  return (
    <div >
      <form onSubmit={forml}>
              <div className=' text-center border-2  h-125 ml-90 mr-90 '>
        <h1 className=' mt-3 text-xl font-bold mt-20'>Login</h1>
        <div className='mt-3'>

            <label className='block'>UserName :-
            <input type="text" placeholder='Enter Username'
             className='border-1 rounded-full text-center mt-5 ml-5 p-1 w-70'
             value={formdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})}/>
             {error.name&&<p style={{color:"red"}}>{error.name}</p>}
        </label> 

        <label className='block'>Password :-
            <input type="password" placeholder='Enter Email' className='border-1 rounded-full text-center mt-5 p-1 w-70 ml-6'
            value={formdata.password} onChange={(e)=>{setFormdata({...formdata,password:e.target.value})}}/>
            {error.password&&<p style={{color:"red "}}>{error.password}</p>}
        </label>

        <button type='submit' className='rounded-full border-1 mt-5 p-3 w-30 '><b>Submit</b></button> <br /> <br /> <br />
        <Link to="/signup" className='underline color-red'>Signup</Link>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Login
