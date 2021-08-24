import React from "react";
import {List, Icon} from "semantic-ui-react"
import Link from "next/link"
import {useRouter} from "next/router"
import {logoutUser} from "../../utils/authUser"


function SideMenu({user:unreadNotification,email,unreadMessagePopup,rfid}) {
  const router=useRouter()

  const isActive=route=>router.pathname===route


  return (<>
      <List style={{paddingTop: "1rem"}} size="big" verticalAlign="middle" selection> 
          <Link href="/dashboard">
              <List.Item active={isActive('/dashboard')}>
                  <Icon name="home" style={{paddingTop:"0.25rem"}} size="small" color={isActive("/dashboard") && "teal"}/>
                  <List.Content>
                    <List.Header  as="h4" content="Dashboard"/>
                  </List.Content>
              </List.Item>
          </Link>
          <Link href="/dashboard/kartu">
              <List.Item active={isActive('/dashboard/kartu')}>
                  <Icon name="address card outline" style={{paddingTop:"0.25rem"}} size="small" color={isActive("/dashboard/kartu") && "teal"}/>
                  <List.Content>
                    <List.Header  as="h4"  content="Card Management"/>
                  </List.Content>
              </List.Item>
          </Link>
          <Link href="/dashboard/user">
              <List.Item active={isActive('/dashboard/users')}>
                  <Icon name="user" style={{paddingTop:"0.25rem"}} size="small" color={isActive("/dashboard/user") && "teal"}/>
                  <List.Content>
                    <List.Header  as="h4"  content="User Management"/>
                  </List.Content>
              </List.Item>
          </Link>
          <Link href="/attendance">
              <List.Item active={isActive('/attendance')}>
                  <Icon name="book" style={{paddingTop:"0.25rem"}} size="small" color={isActive("/attendance") && "teal"}/>
                  <List.Content>
                    <List.Header as="h4" content="Report Management"/>
                  </List.Content>
              </List.Item>
          </Link>
            <List.Item onClick={() => logoutUser(email)}>
                <Icon name="log out" style={{paddingTop:"0.25rem"}} size="small" />
                <List.Content>
                  <List.Header  as="h4" content="Logout"/>
                </List.Content>
            </List.Item>
      </List>
  </>);
}

export default SideMenu;
