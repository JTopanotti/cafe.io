import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import ProductCard from '../../components/product-card';
import Router from 'next/router';
import axios from 'axios';

export default (pageProps) => {
    const [ cart, setCart ] = useState([{}]);
    const [ products, setProducts ] = useState([{}]);
    const { doCartRequest, cartErrors } = useRequest({
        url: '/api/orders/cart', 
        method: 'get',
        onSuccess: (resp) => {
            setCart(prevState => resp);
        } 
    });
    const { doCartProductsRequest, productsErrors } = useRequest({
        url: '/api/orders/cart/products', 
        method: 'get',
        onSuccess: (resp) => {
            setProducts(prevState => resp);
        } 
    });
    
    useEffect(() => {
        doCartProductsRequest();
    }, []);

    const listItems = products.map((p) => <ProductCard product={p} />);

    return (<div>
        <h2>Finalizar Pedido</h2>
        <div>

        </div>
        { listItems }
    </div>)
}