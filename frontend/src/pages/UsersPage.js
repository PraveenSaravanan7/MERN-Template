import React, { useEffect, useState} from 'react'
import { UsersList } from "../components/UsersList";
import axios from "../api";
export const UsersPage = () => {
    var [users,setUsers]=useState([])
    var [loading,setloading]=useState(true); 
    var [err,seterr]=useState(false); 
    async function getUsers() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
            let  url="/users/allusers"
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
        getUsers().then(data=>{
            setUsers(data)
        })
    }, []) 
    return (
        <div className="container pt-5" >
            <div className="jumbotron p-4 border bg-white col-md-6 m-auto" >
         
                {!loading?
                <div>
                  <UsersList users={users} ></UsersList>
                </div>:
                <h3 className="text-primary" >Loading....</h3>}
            </div>
        </div>
    )
}
