import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';
import ProductCard from '../../components/product-card';

export default ({ currentUser, onUpdateCart }) => {
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
        onUpdateCart(resp.data?.length);
    };
    
    useEffect(() => {
        doRequest();
    }, []);

    const listItems = products.map((p) => <ProductCard product={p} onClickAddToCart={addToCart} />);

    return (<div>
        {currentUser && currentUser.admin && <button
            type="button" 
            className="btn btn-primary" 
            onClick={() => Router.push('/products/info')}>Adicionar produto</button>}
        { listItems }
    </div>)
}