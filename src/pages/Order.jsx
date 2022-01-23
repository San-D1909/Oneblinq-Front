// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer';
import { NavMenu } from '../components/NavMenu';

export default function Order() {
  const [order, setOrder] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      // const session_id = query.get('session_id')
      // axios.get(process.env.REACT_APP_API_BACKEND + `/api/v1/admin/Session/${session_id}`)
      // setOrder(session_id)
      setOrder("success")
    }
  }, []);


  return (
    <div>
      <NavMenu />
      <div className="row p-0 mx-auto container bg-dark rounded p-2">
        {order ? <>
          <h1>Thank you for ordering!</h1>
          <p className="text-white">Once your payment has been processed, your license key wil be mailed to you.</p>
          <p className="text-white"><a href="/login">Login/Go to your dashboard</a> or <a href="/register">register</a> to see all your licenses keys on your dashboard</p>
        </> : <></>
        }
      </div>
      <Footer />
    </div>
  )
}
