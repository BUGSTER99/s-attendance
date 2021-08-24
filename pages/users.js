import React, { useState, useEffect } from "react";
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import Layout from "../components/Layout/Layout";
import {parseCookies} from "nookies"


function Users({user,allUsers, errorLoading}) {
    const [users] = useState(allUsers);
    return (
      <>
      <table>
        <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
          {users.allUsers.map(duser => (
              <tr>
                <td>{duser.name}</td>
                <td>{duser.email}</td>
              </tr>
          ))}
          </tbody>
      </table>
      </>
    )
  }

  Users.getInitialProps = async (ctx) => {
    try {
      const {token}=parseCookies(ctx)
      const res=await axios.get(`${baseUrl}/api/user`,{
        headers:{Authorization:token
        }});
      return {allUsers : res.data}
    } catch (error) {
      console.log(error);
      return {errorLoading:true};
    }
  }
  
  // Users.getLayout = function getLayout(page) {
  //   return (
  //       <Layout>
  //     {page}
  //     </Layout>
  //   )
  // }

  export default Users;