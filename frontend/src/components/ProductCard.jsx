function ProductCard({ product }) {
    return (
        <div className="card">
            <h3>{product.name}</h3>

            <p>
                <strong>Category:</strong> {product.category}
            </p>

            <p className="price">
                ₹ {product.price}
            </p>
        </div>
    );
}

export default ProductCard;