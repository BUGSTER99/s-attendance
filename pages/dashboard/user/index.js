import React, { useState, useEffect } from "react";
import axios from "axios"
import baseUrl from "../../../utils/baseUrl"
import Layout from "../../../components/Layout/Layout"
import Link from "next/link"
import {Container,Icon,Button,Search,Table} from "semantic-ui-react"
import {parseCookies} from "nookies"


function Users({user,allUsers, token, errorLoading}) {
    const [users] = useState(allUsers);
    const deleteUser = async (userId) => {
      try {
        const res = await axios.delete(`${baseUrl}/api/user/delete/${userId}`,{
          headers:{Authorization:token
          }});
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
      <Container fluid style={{paddingTop:"2rem"}}>
      <Link href="/dashboard/user/add-user">
        <Icon name="plus" size="large" color="blue"/>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
              <Table.HeaderCell>
                  Nama
              </Table.HeaderCell>
              <Table.HeaderCell>
                  Email
              </Table.HeaderCell>
              <Table.HeaderCell>
                  Aksi
              </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {users.allUsers.map(duser => (
              <Table.Row>
                <Table.Cell>{duser.name}</Table.Cell>
                <Table.Cell>{duser.email}</Table.Cell>
                <Table.Cell>
                    <Icon name="pencil" size="large"/>
                    <Button onClick={()=>deleteUser(duser._id)}>
                    <Icon name="trash" size="large" />
                    </Button>
                </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
      </Container>
      </>
    )
  }

  Users.getInitialProps = async (ctx) => {
    try {
      const {token}=parseCookies(ctx)
      const res=await axios.get(`${baseUrl}/api/user`,{
        headers:{Authorization:token
        }});
      return {allUsers : res.data,token}
    } catch (error) {
      console.log(error);
      return {errorLoading:true};
    }
  }

  export default Users;