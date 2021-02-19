import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

export const UsersList = (props) => {
    return (
        <>
        {props.users.map((u)=>
        <div className="border-bottom mb-2" >
        <NavLink to={'/chat?id='+u._id} >
               <h4>{u.name}</h4>
               <h6>{u.email}</h6>
       </NavLink>
       </div>
        )}

        </>
    )
}
