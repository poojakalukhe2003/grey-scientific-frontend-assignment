export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search product..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}