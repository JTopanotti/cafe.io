
export default ({ product, onClickCallback }) => {

    const style = {
        margin: "10px"
    }

    return (
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                { onClickCallback 
                    &&  <button className="btn btn-success" 
                                onClick={onClickCallback.bind(this, product.id)}>
                                    Adicionar ao Carrinho
                        </button> }
                
            </div>
        </div>
    );
};