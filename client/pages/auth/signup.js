import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [monthlySubscription, setMonthlySubscription] = useState(false);
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup', 
        method: 'post', 
        body: { username, email, password, mailingAddress, monthlySubscription },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    }

    return <form onSubmit={onSubmit}>
        <h1>Criar Conta</h1>

        <div className="form-group">
            <label>Usuário</label>
            <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <label>E-mail</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <label>Senha</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
        </div>

        <div className="form-group">
            <label>Endereço de Entrega</label>
            <input value={mailingAddress} onChange={e => setMailingAddress(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
            <label>Inscrição Mensal:</label>
            <input style={{marginLeft: "10px"}} value={monthlySubscription} onChange={e => setMonthlySubscription(!monthlySubscription)} type="checkbox" />
        </div>

        {errors}

        <button className="btn btn-primary">Enviar</button>
    </form>
}