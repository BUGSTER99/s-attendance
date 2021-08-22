import React from "react";
import {Menu,Container,Icon,Segment,Button, Visibility} from "semantic-ui-react"
import {useRouter} from "next/router"
import Link from "next/link"
import {parseCookies,destroyCookie} from "nookies"
import {redirectUser} from "../../utils/authUser"

function Navbar(ctx) {
  const router=useRouter()

  const isActive=route=>router.pathname===route

  return (
    
    <Menu borderless>
      <Container>
        <Link href="/">
        <Menu.Item>
          Smart Attendance
        </Menu.Item>
        </Link>
        <Menu.Item position='right'>
          <Link  href="/login">
          <Button active={isActive("/login")}>
            <Icon size="small" name="sign in"/>
            Login
          </Button>
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
