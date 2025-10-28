const SchemaDropdown = ({ value, onChange, availableOptions, onRemove, showRemove }) => {
  return (
    <div className="schema-row">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select trait</option>
        {availableOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {showRemove && (
        <button type="button" className="remove-btn" onClick={onRemove}>
          −
        </button>
      )}
    </div>
  );
};

export default SchemaDropdown;