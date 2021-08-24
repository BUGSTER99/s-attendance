import React, { useState, useEffect } from "react";
import axios from "axios"
import baseUrl from "../../../utils/baseUrl"
import {Icon,Button,Search,Table} from "semantic-ui-react"
import {useRouter} from "next/router"
import {parseCookies} from "nookies"


function Kartu({user,allCards,token, errorLoading}) {
    const [cards] = useState(allCards);
    const router=useRouter()
    const findRFID = async e => {
      const {values} = e.target;
      console.log(values);
    }
    const deleteRFID = async (rfid) => {
      try {
        const res = await axios.delete(`${baseUrl}/api/kartu/delete/${rfid}`,{
          headers:{Authorization:token
          }});
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
      <Search onSearchChange={findRFID}/>
      <Table celled>
        <Table.Header>
        <Table.Row>
          <Table.HeaderCell>RFID</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {cards.rfidcards.map(card => (
              <Table.Row>
                  <Table.Cell>
                    {card.RFID}
                  </Table.Cell>
                  <Table.Cell>
                    {card.status}
                  </Table.Cell>
                  <Table.Cell>
                      <Button onClick={()=>deleteRFID(card._id)}>
                          <Icon name="delete" style={{paddingTop:"0.25rem"}} size="large" color={"black"}/>
                          </Button>
                  </Table.Cell>
              </Table.Row>
          ))}
      </Table.Body>
      </Table>
      </>
    )
  }

  Kartu.getInitialProps = async (ctx) => {
    try {
      const {token}=parseCookies(ctx)
      const res=await axios.get(`${baseUrl}/api/kartu/get/`,{
        headers:{Authorization:token
        }});
      return {allCards : res.data,token}
    } catch (error) {
      console.log(error);
      return {errorLoading:true};
    }
  }
  
  export default Kartu;