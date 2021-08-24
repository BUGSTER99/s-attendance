import App from "next/app"
import axios from "axios"
import {parseCookies,destroyCookie} from "nookies"
import baseUrl from "../utils/baseUrl"
import {redirectUser} from "../utils/authUser"
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/Layout/Layout"
 
function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  return (
    <Layout {...pageProps}>
        <Component {...pageProps} />
    </Layout>
    )
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  const {token}=parseCookies(ctx)
  let pageProps = {}

  const protectedRoutes = ctx.pathname === "/dashboard" || 
  ctx.pathname === "/attendance" ||
   ctx.pathname === "/dashboard/kartu" ||
   ctx.pathname === "/dashboard/user" ||
   ctx.pathname === "/dashboard/user/add-user"


  if(!token){
    destroyCookie(ctx,"token");
    protectedRoutes && redirectUser(ctx, "/login");
  } else {
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res=await axios.get(`${baseUrl}/api/auth`,{
        headers:{Authorization:token
        }});
      const { user }=res.data
      if(user) !protectedRoutes && redirectUser(ctx,"/dashboard");
      pageProps.user = user;
    } catch (error) {
      console.error(error);
      destroyCookie(ctx,"token");
      redirectUser(ctx,"/login");
    }
  }
  return {pageProps};  
}


export default MyApp;