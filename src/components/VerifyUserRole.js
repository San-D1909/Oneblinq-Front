
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"

function VerifyUserRole()
{

    const [user, setUser] = React.useState(null)

    useEffect(() => {

        try{
            axios({
                method: "GET",
                url: process.env.REACT_APP_API_BACKEND + "/api/v1/user/GetUserByToken",
                params: {
                  jtoken: localStorage.getItem("token"),
                },
              }).then((data) => {
                  setUser(data.data.userById)
              })
        }
        catch(error){
            console.log(error)
            return
        }


    }, []);

    return user;

}

export default VerifyUserRole;