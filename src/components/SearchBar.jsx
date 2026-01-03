export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar-wrapper">
      <input
        className="search"
        placeholder="Search product..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}