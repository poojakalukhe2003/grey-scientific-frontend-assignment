import { useState } from "react";
import { initialProducts } from "./data/initialProducts";
import ProductTable from "./components/ProductTable";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { useDebounce } from "./hooks/useDebounce";
import "./styles/App.css";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const ITEMS_PER_PAGE = 4;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSave = (product) => {
    if (product.id) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } else {
      setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <h1 className="header-title">Grey Scientific Labs</h1>
        <p className="header-subtitle">Product Management Assignment</p>
      </header>

      {/* FORM */}
      <section className="form-section">
        <div className="card">
          <ProductForm
            onSubmit={handleSave}
            editingProduct={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      </section>

      {/* CONTROLS */}
      <section className="controls-section">
        <div className="controls">
          <div className="controls-search">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="toggle">
            <button
              className={view === "table" ? "active" : ""}
              onClick={() => setView("table")}
              type="button"
            >
              Table View
            </button>
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
              type="button"
            >
              Card View
            </button>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="list-section">
        {view === "table" ? (
          <ProductTable products={paginated} onEdit={setEditingProduct} />
        ) : (
          <ProductGrid products={paginated} onEdit={setEditingProduct} />
        )}
      </section>

      {/* PAGINATION */}
      <section className="pagination-section">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}