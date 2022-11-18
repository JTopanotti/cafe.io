import { useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
    const [name, setName] = useState('Test');
    const [description, setDescription] = useState('Test');
    const [price, setPrice] = useState(10.5);
    const [quantity, setQuantity] = useState(100);
    const { doRequest, errors } = useRequest({
        url: '/api/products', 
        method: 'post', 
        body: { name, description, price, quantity, registrationDate: new Date() },
        onSuccess: () => Router.push('/products')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    }

    return <form onSubmit={onSubmit}>
        <h1>Criar Novo Produto</h1>

        <div className="form-group">
            <label>Nome</label>
            <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <label>Descrição</label>
            <input value={description} onChange={e => setDescription(e.target.value)}  className="form-control" />
        </div>
        <div className="form-group">
            <label>Preço</label>
            <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="form-control" />
        </div>
        <div className="form-group">
            <label>Quantidade</label>
            <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" className="form-control" />
        </div>

        <div className='form-group'>
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    // setSelectedImage(event.target.files[0]);
                }}
            />
        </div>

        {errors}

        <button className="btn btn-primary">Enviar</button>
    </form>
}