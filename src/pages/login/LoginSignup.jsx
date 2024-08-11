import React,{useState} from 'react';
import "./LoginSignup.css"

const LoginSignup = () => {
 const [state, setState] = useState('login')
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  const changeHandler = (e)=>{
 setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
 console.log("login function excuted ", formData);
 let responseData;
 await fetch('http://localhost:4000/login',{
   method:'POST',
   headers:{
     Accept:'application/form-data',
     'Content-Type':'application/json',
   },
   body: JSON.stringify(formData),
 }).then((response)=>response.json()).then((data)=>responseData=data)
 if(responseData.success){
   localStorage.setItem('auto-token',responseData.token);
   window.location.replace('/')
 }
 else{
   alert(responseData.errors)
 }
  }

  const signup = async ()=>{
    console.log("sign up function excuted",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auto-token',responseData.token);
      window.location.replace('/')
    }
    else{
      alert(responseData.errors)
    }
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Enter your Name Here' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Enter Your Email Here' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Enter your Password Here'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
       {state==="Sign Up"?<p className="loginsignup-login">
          Already Have account ?<span onClick={()=>{setState("Login")}}>Login here</span>
        </p> 
        : <p className="loginsignup-login">
          create an account <span onClick={()=>{setState("Sign up")}}> click here</span>
        </p>}       
      
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continue, i agree to the terms of use  & privacy policy </p>
        </div>
      </div>
    </div>
  );
}



export default LoginSignup;
