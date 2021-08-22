import React, { useState, useEffect, useRef} from "react";
import { Grid, Header, Segment, Message,Container } from "semantic-ui-react";

function Attendance({user}){    
    const name = "-";
   if(user){
        name = user.name
    } 
    
    return (
        <>
            <Container>
                <Message
                    style={{marginTop:'1rem'}}
                    color="teal"
                    attached
                    header="Smart Attendance"
                    icon="privacy"
                >
                </Message>
                <Grid style={{padding:"2rem"}}>
                    <Grid.Column width={10}>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header as="h3">
                            Data User
                        </Header>
                        <Header as="h3">
                            Nama : {name}
                        </Header>
                        </Grid.Column>
                </Grid>
            </Container>
        </>
        
    );
}

Attendance.getInitialProps = async (ctx) => {
  try{
      const res=await axios.get('');
      return {posts:res.data}
  } catch (error){
      return {errorLoading:true}
  }
};

export default Attendance;