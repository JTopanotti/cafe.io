import { useEffect, useState } from 'react';
import Router from 'next/router';
import FormData from 'form-data';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link';

const ProductPage = ({currentUser}) => {
    const router = useRouter();
    
    const [id, setId] = useState(undefined);
    const [name, setName] = useState('Test');
    const [description, setDescription] = useState('Test');
    const [price, setPrice] = useState(10.5);
    const [quantity, setQuantity] = useState(100);
    const [imageFile, setImageFile] = useState();
    const [imageBase64, setImageBase64] = useState();
    // const [photoId, setPhotoId] = useState(undefined);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (router.query?.id) {
            await axios.get('/api/products/' + router.query.id)
                .then(resp => {
                    if (resp.data?.id) {
                        const p = resp.data;
                        setId(p.id)
                        setName(p.name);
                        setDescription(p.description);
                        setPrice(p.price);
                        setQuantity(p.quantity);

                        if (p.photoId) {
                            axios.get('/api/products/photo/' + p.id)
                                .then(resp => {
                                    setImageBase64(`data:image/jpeg;base64,${resp.data}`);
                                })
                                .catch(err => console.log(err));
                        }
                    }
                })
                .catch(err => console.log(err));
        }
        
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (imageFile) {
            let formData = new FormData();
            formData.append('imageFile', imageFile, imageFile.name);
            await axios.post('/api/products/photo', formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }})
            .then(resp => {
                if (id) {
                    updateProduct(resp.data.photoId);
                } else {
                    newProduct(resp.data.photoId);
                }
            })
            .catch(err => console.log("Error:", err));
        } else {
            if (id) {
                updateProduct(null);
            } else {
                newProduct(null);
            }
        }
    };

    const newProduct = async (photoId) => {
        await axios.post('/api/products', {
            name, description, price, quantity, photoId
        })
        .then(resp => {
            Router.push("/products");
        })
        .catch(err => console.log("Error:", err));
    };

    const updateProduct = async (photoId) => {
        await axios.put('/api/products/' + id , {
            name, description, price, quantity, photoId
        })
        .then(resp => {
            Router.push("/products");
        })
        .catch(err => console.log("Error:", err));
    };

    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageBase64(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Reader Error", error);
        };
    }

    const styles = {
        container: {
            display: "flex"
        },
        inputFields: {
            marginRight: "30px"
        },
        imageArea: {
            marginTop: "10px"
        },
        removeButton: {
            backgroundColor: "red",
            color: "white",
            marginTop: "5px",
            marginBottom: "5px"
        }
    };

    return <form onSubmit={onSubmit} enctype="multipart/form-data">
        <h1>Criar Novo Produto</h1>
        <div style={styles.container}>
            <div style={styles.inputFields}>
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
                <div style={styles.container}>
                    <button style={{marginTop: "10px", marginRight: "10px"}} className="btn btn-primary">Salvar</button>
                    {id && <Link href={{pathname: '/products/feedback', query: {productId: id}}}> 
                        <button style={{marginTop: "10px"}} className="btn btn-success">Dar Feedback</button>
                    </Link>}    
                </div>
            </div>
            <div style={styles.imageArea}>
                {imageBase64 && (
                    <div>
                        <img alt="not fount" width={"250px"} src={imageBase64}/>
                        {/* {editMode && <img alt="not fount" width={"250px"} src={`data:image/png;base64,${imageFile}`}/>}
                        {!editMode && <img alt="not fount" width={"250px"} src={URL.createObjectURL(imageFile)} />} */}
                        <br />
                        <button className='btn btn-error' style={styles.removeButton} onClick={()=>{setImageFile(null); setImageBase64(null)}}>Remove</button>
                    </div>
                )}
                <div className='form-group'>
                    <input
                        type="file"
                        name="imageFile"
                        onChange={(event) => {
                            setImageFile(event.target.files[0]);
                            getBase64(event.target.files[0]);
                        }}
                    />
                </div>
            </div>
        </div>

        {errors}
    </form>
};

export default ProductPage;
