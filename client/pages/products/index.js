import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';
import ProductCard from '../../components/product-card';

export default (pageProps) => {
    const [ products, setProducts ] = useState([{}]);
    const { doRequest, errors } = useRequest({
        url: '/api/products', 
        method: 'get',
        onSuccess: (resp) => {
            setProducts(prevState => resp);
        } 
    });

    const addToCart = async (productId) => {
        const payload = {
            productId,
            quantity: 1
        };

        const resp = await axios.post('/api/orders/cart/add', payload);
        pageProps.onUpdateCart(resp.data)
    };
    
    useEffect(() => {
        doRequest();
    }, []);

    const listItems = products.map((p) => <ProductCard product={p} onClickCallback={addToCart} />);

    return (<div>
        <button
            type="button" 
            className="btn btn-primary" 
            onClick={() => Router.push('/products/register')}>Adicionar produto</button>
        { listItems }
    </div>)
}