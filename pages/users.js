import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout"
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import { loginUser } from "../utils/authUser";
import { HeaderMessage, FooterMessage } from "../components/Common/WelcomeMessage";


function Users({user}) {
    return "Dashboard";
  }
  
  Users.getLayout = function getLayout(page) {
    return (
        <Layout>
      {page}
      </Layout>
    )
  }

  export default Users;