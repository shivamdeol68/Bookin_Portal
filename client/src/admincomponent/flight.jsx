import React from 'react'
import AdminNavbar from './AdminNavbar'
// import Totalflight from './totalflight'
import { Link } from 'react-router-dom'

function Flight() {
  return (
   <>
   <AdminNavbar/>
   <div className='flex justify-center  border-b-2 border-grey' >
    <Link to="/Flight-Total"> <button className='  p-1   border-2 rounded-md me-2 my-3 '>Total</button></Link> 
    <Link to="/Publish-Flight"><button className=' p-1  border-2 rounded-md my-3'>Publish</button></Link>   
   </div>
   </>
  )
}

export default Flight;