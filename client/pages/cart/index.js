import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import ProductCard from '../../components/product-card';
import buildClient from '../../api/build-client';
import Router from 'next/router';
import axios from 'axios';

const UserCartPage = ({ cartWithProducts, order, onUpdateCart }) => {
    const [ paymentMethod, setPaymentMethod] = useState();
    const { doRequest, errors } = useRequest({
        url: '/api/orders/' + order.id, 
        method: 'put',
        body: {
            userId: order.userId,
            total: cartWithProducts.total,
            date: new Date(),
            status: "CLOSED",
            paymentMethod
        },
        onSuccess: (resp) => {
            onUpdateCart(0);
            Router.push("/");
        } 
    });

    const onPaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();  
    };

    const removeFromCart = async (productId) => {
        await axios.delete('/api/orders/cart', { productId, orderId: order.id});
    };

    let listItems = [];
    if (cartWithProducts.products) {
        listItems = cartWithProducts.products.map((p) => <ProductCard product={p} onClickRemove={removeFromCart} />);
    }

    const styles = {
        radio: {
            marginLeft: "15px",
            marginRight: "5px"
        }
    };

    return (<div>
        {cartWithProducts.products && <div>
            <h2>Finalizar Pedido</h2>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Forma de Pagamento</label>
                    <div onChange={onPaymentChange}>
                        <input style={styles.radio} type="radio" value="PIX" name="paymentMethod" /> 
                        <label>Pix</label>
                        <input style={styles.radio} type="radio" value="BOLETO" name="paymentMethod" /> 
                        <label>Boleto</label>
                        <input style={styles.radio} type="radio" value="CARTAO" name="paymentMethod" /> 
                        <label>Cartão</label>
                    </div>
                </div>

                { listItems }

                <h3>Total: {cartWithProducts.total}</h3>

                <button className="btn btn-primary">Finalizar</button>
            </form>
        </div>}
        {!cartWithProducts.products && <h2>Sem itens no carrinho!</h2>}
    </div>)
};

UserCartPage.getInitialProps = async (ctx) => {
    let order = {};
    let cartWithProducts = {};

    const cartResp = await buildClient(ctx)
        .get('/api/orders/cart/products')
        .catch(err => console.log(err));

    if (cartResp?.data) {
        cartWithProducts = cartResp.data;
        const orderResp = await buildClient(ctx)
            .get('/api/orders/' + cartWithProducts.cart.orderId)
            .catch(err => console.log(err));;
        order = orderResp?.data;
    }

    return {cartWithProducts, order};
};

export default UserCartPage;