import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser, cartResp }) => {
    const [cart, setCart] = useState(cartResp);

    return ( 
        <div>
            <Header currentUser={currentUser} cart={cart} />
            <div style={{padding: "30px"}}>
                <Component {...pageProps} onUpdateCart={setCart} />
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async appCtx => {
    const client = buildClient(appCtx.ctx);
    const currentUserResp = await client.get('/api/users/currentuser');
    const currentUser = currentUserResp.data.currentUser;
    let cart = [];
    console.log(currentUser);

    if (currentUser) {
        const userCartResp = await client.get('/api/orders/cart')
            .catch(err => console.log("Error",err.toJSON()))
            .then(resp => {
                if (resp && resp.data) cart = resp.data
            });
    }

    let pageProps = {};
    if (appCtx.Component.getInitialProps) {
        pageProps = await appCtx.Component.getInitialProps(appCtx.ctx);
    }

    return {
        pageProps,
        ...currentUserResp.data,
        cartResp: cart
    };      
}

export default AppComponent;