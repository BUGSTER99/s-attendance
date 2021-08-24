import React, { useState, useEffect } from "react";
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import Layout from "../components/Layout/Layout";
import Link from "next/link"
import {Icon} from "semantic-ui-react"
import {useRouter} from "next/router"
import {parseCookies} from "nookies"


function Kartu({user,allCards, errorLoading}) {
    const [cards] = useState(allCards);
    const router=useRouter()
    const isActive=route=>router.pathname===route
    return (
      <>
      <table>
        <thead>
        <tr>
          <th>RFID</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
        </thead>
        <tbody>
          {cards.rfidcards.map(card => (
              <tr>
                <td>{card.RFID}</td>
                <td>{card.status}</td>
                <td>
                    <Link href="/kartu/delete/">
                        <Icon name="delete" style={{paddingTop:"0.25rem"}} size="small" color={isActive('/kartu') && "teal"}/>
                    </Link>
                </td>
              </tr>
          ))}
          </tbody>
      </table>
      </>
    )
  }

  Kartu.getInitialProps = async (ctx) => {
    try {
      const {token}=parseCookies(ctx)
      const res=await axios.get(`${baseUrl}/api/kartu/get-all-RFID/`,{
        headers:{Authorization:token
        }});
      return {allCards : res.data}
    } catch (error) {
      console.log(error);
      return {errorLoading:true};
    }
  }
  
  export default Kartu;