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

    const addToCart = async (event, productId) => {
        event.preventDefault();
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

    let listItems;
    if (currentUser && !currentUser.admin) {
        listItems = products.map((p) => <ProductCard product={p} onClickAddToCart={addToCart} />);
    } else {
        listItems = products.map((p) => <ProductCard product={p} />);
    }
    

    return (<div>
        {currentUser && currentUser.admin && <button
            type="button" 
            style={{marginBottom: "10px"}}
            className="btn btn-success" 
            onClick={() => Router.push('/products/info')}>Adicionar produto</button>}
        { listItems }
    </div>)
}