import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  price: "",
  category: "",
  stock: "",
  description: ""
};

export default function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setTouched({});
      setErrors({});
    } else {
      setForm(initialForm);
      setTouched({});
      setErrors({});
    }
  }, [editingProduct]);

  // Simple UI-side validation for highlighting
  const validate = (f = form) => {
    const errs = {};
    if (!f.name.trim()) errs.name = "Name is required";
    if (!f.price.toString().trim()) errs.price = "Price is required";
    if (!f.category.trim()) errs.category = "Category is required";
    return errs;
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
    if (touched[field]) {
      setErrors(validate({ ...form, [field]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      price: true,
      category: true,
      stock: true,
      description: true
    });
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSubmit({ ...form, price: +form.price, stock: +form.stock });
      setForm(initialForm);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <form
      className="form product-form"
      onSubmit={submit}
      autoComplete="off"
    >
      <div className="form-grid">
        <h2 className="form-heading">{editingProduct ? "Edit Product" : "Add Product"}</h2>

        <div className="form-field-row">
          <label htmlFor="prod-name" className="form-label">
            Name<span className="form-label-required">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              id="prod-name"
              className={`form-input ${errors.name && touched.name ? "error" : ""}`}
              required
              placeholder="Name"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && touched.name && (
              <div className="form-error">{errors.name}</div>
            )}
          </div>
        </div>

        <div className="form-field-row">
          <label htmlFor="prod-price" className="form-label">
            Price<span className="form-label-required">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              id="prod-price"
              type="number"
              className={`form-input ${errors.price && touched.price ? "error" : ""}`}
              required
              placeholder="Price"
              value={form.price}
              onChange={e => handleChange("price", e.target.value)}
              onBlur={() => handleBlur("price")}
              min="0"
              step="0.01"
            />
            {errors.price && touched.price && (
              <div className="form-error">{errors.price}</div>
            )}
          </div>
        </div>

        <div className="form-field-row">
          <label htmlFor="prod-category" className="form-label">
            Category<span className="form-label-required">*</span>
          </label>
          <div className="form-input-wrapper">
            <input
              id="prod-category"
              className={`form-input ${errors.category && touched.category ? "error" : ""}`}
              required
              placeholder="Category"
              value={form.category}
              onChange={e => handleChange("category", e.target.value)}
              onBlur={() => handleBlur("category")}
            />
            {errors.category && touched.category && (
              <div className="form-error">{errors.category}</div>
            )}
          </div>
        </div>

        <div className="form-field-row">
          <label htmlFor="prod-stock" className="form-label">Stock</label>
          <input
            id="prod-stock"
            type="number"
            className="form-input"
            placeholder="Stock"
            value={form.stock}
            onChange={e => handleChange("stock", e.target.value)}
            min="0"
            onBlur={() => handleBlur("stock")}
          />
        </div>

        <div className="form-field-row">
          <label htmlFor="prod-desc" className="form-label">Description</label>
          <textarea
            id="prod-desc"
            className="form-textarea"
            placeholder="Description"
            value={form.description}
            onChange={e => handleChange("description", e.target.value)}
            onBlur={() => handleBlur("description")}
          />
        </div>

        <div className="form-actions-wrapper">
          <button className="primary form-button" type="submit">
            Save
          </button>
          {editingProduct && (
            <button
              type="button"
              className="form-button-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}