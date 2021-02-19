import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "../api"
const ls=require("local-storage")
export const HomePage = () => {
    var [user,setUser]=useState([null])
    var [loading,setloading]=useState(true); 
    var [err,seterr]=useState(false); 
    async function getUser() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
            let  url="/users"
          const response = await axios.get(url);  
          setloading(false)       
          if(response.data){
            console.log(response.data)
            return response.data
          }
          
        } catch (error) {
          seterr(error);
         // setloading(false)
        }
      }
    
    useEffect(() => {
        getUser().then(data=>{
            setUser(data)
        })
    }, [])
    return (
        <div className="container pt-5" >
            <div className="jumbotron p-4 border bg-white col-md-6 m-auto" >
            <h1 className="text-primary mb-3" ><b>ATM</b></h1>
           
                {!loading?
                <div>
                    <h2>{user.name}</h2>
                    <h6>{user.email}</h6>
                    <h1 className="text-success mb-4" >₹ {user.money}</h1>
                   <Link to={'/panel?type=1&bal='+user.money} >
                   <button type="button" className="btn btn-lg btn-light shadow-sm btn-block" >Withdraw Cash</button>
                   </Link>
                   <Link to={'/panel?type=2'} >
                   <button className="btn btn-lg btn-light shadow-sm btn-block mt-4" >Deposit Cash</button>
                    </Link>
                </div>:
                <h3 className="text-primary" >Loading....</h3>}
            </div>
        </div>
    )
}
