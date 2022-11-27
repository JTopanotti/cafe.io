import Link from 'next/link';

export default ({ product, onClickAddToCart, onClickRemove }) => {
    const style = {
        container: {
            margin: "10px"
        },
        button: {
            backgroundColor: "red"
        }
    }

    return (
        <Link href={{pathname: '/products/info', query: {id: product.id}}}>
            <div className="card" style={style}>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    { onClickAddToCart 
                        &&  <button className="btn btn-success" 
                                    onClick={event => onClickAddToCart(event, product.id)}>
                                        Adicionar ao Carrinho
                            </button> }
                    { onClickRemove 
                        &&  <button className='btn btn-primary' style={style.button}
                                    onClick={onClickRemove.bind(this, product.id)}>
                                        Remover 
                            </button> }
                </div>
            </div>
        </Link>
    );
};