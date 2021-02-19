import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../api'
export const PanelPage = () => {
  let query= new URLSearchParams(useLocation().search)
  let type=query.get("type")
  let balance=query.get("bal")
  var [formData, updateFormData] = useState([]);
  var [loading,setloading]=useState(false); 
  var [err,seterr]=useState(false);
  var [success, setsuccess]=useState(false)
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };
  async function withdraw(t) {
    //console.log(formData)
    setloading(true)
    seterr(false)
    try {           
        let  url="/users"
        let form={
          ...formData,
          "type":t
        }
      console.log(form)
      const response = await axios.put(url, form);  
      setloading(false)       
      if(response.data){
        setsuccess(true)
        return response.data
      }
      
    } catch (error) {
      seterr(error);
     // setloading(false)
    }
  }
 useEffect(() => {
   if(type==2){
     updateFormData({"hun":0,"two_hun":0,"five_hun":0})
   }
   console.log(formData)
 }, []) 
  return (
    <div className="container pt-5" >
    <div className="jumbotron p-4 border bg-white col-md-6 m-auto" >
    <h1 className="text-primary mb-3" ><b>ATM</b></h1>
    {success? <h1 className="text-success" >Success !!!</h1>:
    <>
   {type==1?
  <div>
    <h3>Withdraw Cash</h3>
    <div>
         <div className="form-group ">
      <span><b>Enter Amount </b></span>
    <input type="number" className="form-control" required  name="amount"  onChange={handleChange} />
    {formData.amount >0 && formData.amount <= parseInt( balance) &&
    <button className="mt-2 btn  btn-success" onClick={()=>{withdraw(1)}} >
  {loading? <>Loading...</>:<>Withdraw</> } 
  </button>
  }
  </div>
      </div>
  </div>:
  <div>
    <h3>Deposit Cash</h3>
    <div>
         <div className="form-group ">
      <span><b>Enter Amount </b></span>
    <input type="number" className="form-control" required  name="amount"  onChange={handleChange} />
    <div className="row mt-5" >
      <div className="col-4" >
        <h5>₹ 100 x</h5>
      </div>
      <div className="col-6" >
      <input type="number" className="form-control" required  name="hun" onChange={handleChange} />
      </div>
      <div className="col-4" >
        <h5>₹ 200 x</h5>
      </div>
      <div className="col-6" >
      <input type="number" className="form-control" required  name="two_hun"  onChange={handleChange} />
      </div>
      <div className="col-4" >
        <h5>₹ 500 x</h5>
      </div>
      <div className="col-6" >
      <input type="number" className="form-control" required  name="five_hun"  onChange={handleChange} />
      </div>
    </div>
    {formData.amount >0 && formData.hun*100 + formData.two_hun*200 + formData.five_hun*500  == formData.amount &&
    <button className="mt-2 btn  btn-success" onClick={()=>{withdraw(2)}} >
  {loading? <>Loading...</>:<>Deposit</> } 
  </button>
  }
  </div>
      </div>
  </div> 
  }
  </>}
    </div>
    </div>
  )
}
