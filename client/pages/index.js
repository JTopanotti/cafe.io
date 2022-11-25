import buildClient from "../api/build-client";

const LandingPage = ({currentUser}) => {
    return currentUser ? <h1>Você está logado</h1> : <h1>Você está deslogado</h1>
}; 

LandingPage.getInitialProps = async (ctx) => {
    const {data} = await buildClient(ctx).get("/api/users/currentuser");
    return data;
};

export default LandingPage;