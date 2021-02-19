import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../api'
const ls=require('local-storage')
export const LoginPage = () => {
    
    const history=useHistory()
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false); 
    var [err,seterr]=useState(false);
    var [tab,settab]=useState(true)
    async function signup() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users',formData);         
          if(response.data){
            return response.data
          }
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
    async function login() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users/login',formData);         
          if(response.data){
            return response.data
          }
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
  
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    };
    function handleSignup(event){
        event.preventDefault();
        signup().then(data =>{
          if(data.accessToken){
          ls("accessToken",data.accessToken);
          ls("user_id",data.user_id);
          ls("admin",data.admin);
          gotohome()
          }
        })
    }
    function handleLogin(event){
      event.preventDefault();
      login().then(data =>{
        if(data.accessToken){
          console.log(data)
        ls("accessToken",data.accessToken);
        ls("user_id",data.user_id);
        ls("admin",data.admin)
        gotohome()
        }
      })
  }
 function  gotohome() {
    window.location.href="/"
 }
    return (
      <div className="container pt-5" >
      <div className="jumbotron border bg-white col-md-5 m-auto pt-5" >
         <h1 className="text-primary mb-3" ><b>CHAT systeM</b></h1>
           
             <div className=" p-1 " >
               
                 <button  className={tab?"btn btn-primary":"btn btn-light bg-white"}  onClick={ ()=>{settab(true)}} >SignUp</button>
                 <button className={!tab?"btn btn-primary ml-2":"btn btn-light bg-white ml-2"} onClick={ ()=>{settab(false)}} >LogIn</button>
                
                </div> 
      {tab?
            <form className="mt-4 px-2" onSubmit={(event) => handleSignup(event)}>
        <div className="form-group ">
<span ><b>Name</b></span>
    <input type="text" className="form-control" required  name="name"  onChange={handleChange}/>
  </div>
<div className="form-group ">
<span><b>Email</b></span>
    <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span  ><b>New Password</b></span>
    <input type="password" className="form-control" required name="password" onChange={handleChange}/>
  </div>
 
  {err &&
  <span className="text-danger font-weight-bold">Email already exists try to log in. <br/></span>
}
  <button type="submit" className="mt-2 btn  btn-dark">
  {loading? <>Loading...</>:<>Submit</> } 
  </button>
</form>
      :  
<form className="mt-4 px-2" onSubmit={(event) => handleLogin(event)}>      
<div className="form-group ">
<span><b>Email</b></span>
  <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
</div>
<div className="form-group">
  <span  ><b>Password</b></span>
  <input type="password" className="form-control" required name="password" onChange={handleChange}/>
</div>
{err &&
<span className="text-danger font-weight-bold">Incorrect Email or Password. <br/></span>
}
<button type="submit" className="mt-2 btn  btn-dark">
{loading? <>Loading...</>:<>Submit</> } 
</button>
</form>
   }
          </div>
        </div>
    )
}
