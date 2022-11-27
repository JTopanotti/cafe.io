import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/use-request';

const FeedbackPage = ({}) => {
    const router = useRouter();
    const [productId, setProductId] = useState(undefined);
    const [feedback, setFeedback] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/products/feedback', 
        method: 'post',
        body: { productId, feedback },
        onSuccess: (resp) => {
            Router.push('/products')
        } 
    });

    useEffect(() => {
        console.log(router.query);
        setProductId(router.query.productId);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    };

    const handleChange = (event) => {
        setFeedback(event.target.value);
    }

    const styles = {
        container: {
            display: "flex"
        }
    };

    return <form onSubmit={onSubmit} enctype="multipart/form-data">
        <div>
            <h1>Dar Feedback</h1>
            <div>
            <textarea
                value={feedback}
                onChange={handleChange}
            />
            </div>
            <button style={{marginTop: "10px"}} className="btn btn-primary">Enviar</button>
            {errors}
        </div>
    </form>
};

export default FeedbackPage;
