import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import ProductCard from '../../components/product-card';
import buildClient from '../../api/build-client';
import Router from 'next/router';

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

    const listItems = cartWithProducts.products.map((p) => <ProductCard product={p} />);

    const onPaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();  
    };

    const styles = {
        radio: {
            marginLeft: "15px",
            marginRight: "5px"
        }
    };

    return (<div>
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

            <button className="btn btn-primary">Enviar</button>
        </form>
    </div>)
};

UserCartPage.getInitialProps = async (ctx) => {
    let order = {};
    let cartWithProducts = {};

    const cartResp = await buildClient(ctx).get('/api/orders/cart/products');

    if (cartResp?.data) {
        cartWithProducts = cartResp.data;
        const orderResp = await buildClient(ctx).get('/api/orders/' + cartWithProducts.cart.orderId);
        order = orderResp?.data;
    }

    return {cartWithProducts, order};
};

export default UserCartPage;