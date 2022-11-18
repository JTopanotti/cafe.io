import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    return currentUser ? <h1>You are Signed In</h1> : <h1>You are Not Signed In</h1>
}; 

LandingPage.getInitialProps = async (ctx) => {
    const {data} = await buildClient(ctx).get("/api/users/currentuser");
    return data;
};

export default LandingPage;