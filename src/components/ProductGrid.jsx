export default function ProductGrid({ products, onEdit }) {
  return (
    <div className="grid-wrapper">
      <div className="grid">
        {products.length === 0 ? (
          <div className="card-item no-products">
            <span className="no-products-text">No products found</span>
          </div>
        ) : (
          products.map(p => (
            <div className="card-item" key={p.id}>
              <div className="card-header">
                <h3 className="product-name">{p.name}</h3>
                <span className="product-price">₹{p.price}</span>
              </div>
              <div className="card-meta">
                <p className="product-category">{p.category}</p>
                <p className="product-stock">
                  <span className="meta-label">Stock: </span>
                  {p.stock || "-"}
                </p>
              </div>
              {p.description && (
                <p className="product-description">{p.description}</p>
              )}
              <div className="card-actions">
                <button className="edit-btn" onClick={() => onEdit(p)}>
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}