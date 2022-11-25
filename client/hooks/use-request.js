import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const resp = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(resp.data);
            }

            return resp.data;
        } catch (e) {
            if (e.response?.data?.errors) {
                setErrors(
                    <div className='alert alert-danger'>
                        <h4>Ooops. Something went wrong...</h4>
                        <ul className='my-0'>
                            {e.response.data.errors.map(e => <li key={e.message}>{e.message}</li>)}
                        </ul>
                    </div>
                );
            }
        }
    };

    return {doRequest, errors};
};