import React,{createRef} from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import { Container,Grid,Ref, Divider, Sticky, Visibility } from "semantic-ui-react";
import nprogress from "nprogress"
import Router from "next/router"
import SideMenu from "../Layout/SideMenu"

function Layout({children, user}) {
  const contextRef=createRef();

  Router.onRouterChangeStart = () => nprogress.start();
  Router.onRouterChangeComplete = () => nprogress.done();
  Router.onRouterChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      {user ? (
      <>
        <div style={{marginLeft:"1rem", marginRight:"1rem"}}>
          <Ref innerRef={contextRef}>
            <Grid>
              <Grid.Column floated="left" width={2}>
                  <Sticky context={contextRef}>
                      <SideMenu user={user}/>
                  </Sticky>
              </Grid.Column>
              <Grid.Column width={14} floated="left">
                <Visibility context={contextRef}>
                  {children}
                </Visibility>
              </Grid.Column>
            </Grid>
          </Ref>
        </div>
      </>
      ):(
      <>
      <Navbar />
      <Container style={{ paddingTop: "1rem" }}>
        {children}
      </Container>
      </>
      )}
     
    </>
  );
}

export default Layout;
