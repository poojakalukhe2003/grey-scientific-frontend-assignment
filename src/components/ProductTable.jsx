export default function ProductTable({ products, onEdit }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price ₹</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6">No products found</td></tr>
          ) : (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock || "-"}</td>
                <td>{p.description || "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(p)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}