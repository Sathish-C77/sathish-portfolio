import { useState } from "react";
import SchemaDropdown from "./SchemaDropdown.jsx";

const traits = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const Modal = ({ isOpen, onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");

  // YOUR WEBHOOK URL — MUST BE EXACT
  const WEBHOOK_URL = "https://webhook.site/77dd9e44-502d-4e9b-a1dc-f153da0114c5";

  const availableOptions = traits.filter(
    (trait) => !selectedSchemas.some((s) => s.value === trait.value)
  );

  const addSchema = () => {
    if (!currentSelection) return;
    const selectedTrait = traits.find((t) => t.value === currentSelection);
    if (selectedTrait) {
      setSelectedSchemas([...selectedSchemas, selectedTrait]);
      setCurrentSelection("");
    }
  };

  const removeSchema = (index) => {
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((s) => ({
        [s.value]: s.label,
      })),
    };

    console.log("Sending payload:", payload);

    // Show payload in UI for demo
    alert(`Sending:\n${JSON.stringify(payload, null, 2)}`);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // This allows the request to go through
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // With no-cors, we can't read response
      console.log("POST sent (no-cors mode)");
      alert("Segment saved! Check webhook.site inbox.");
      onClose();
    } catch (err) {
      console.error("Fetch failed:", err);
      alert("Saved locally (check console). Check webhook.site for data.");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Saving Segment
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label>Enter the Name of the Segment</label>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>

          <p style={{ margin: "16px 0 8px", fontSize: "14px", color: "#6b7280" }}>
            To save your segment, you need to add the schemas to build the query
          </p>

          <div className="trait-legend">
            <div className="legend-item">
              <div className="legend-dot user-trait"></div>
              <span>User Traits</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot group-trait"></div>
              <span>Group Traits</span>
            </div>
          </div>

          <div className="blue-box">
            {selectedSchemas.map((schema, index) => (
              <SchemaDropdown
                key={index}
                value={schema.value}
                onChange={(val) => {
                  const updated = [...selectedSchemas];
                  const newTrait = traits.find((t) => t.value === val);
                  if (newTrait) {
                    updated[index] = newTrait;
                    setSelectedSchemas(updated);
                  }
                }}
                availableOptions={traits.filter(
                  (t) =>
                    t.value === schema.value ||
                    !selectedSchemas.some((s) => s.value === t.value)
                )}
                onRemove={() => removeSchema(index)}
                showRemove={true}
              />
            ))}
            {selectedSchemas.length === 0 && (
              <p style={{ color: "#93c5fd", fontStyle: "italic", margin: "8px 0", fontSize: "14px" }}>
                No schemas added yet.
              </p>
            )}
          </div>

          {availableOptions.length > 0 && (
            <div className="input-group">
              <select
                value={currentSelection}
                onChange={(e) => setCurrentSelection(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <a className="add-schema-link" onClick={addSchema}>
                + Add new schema
              </a>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={!segmentName || selectedSchemas.length === 0}
          >
            Save the Segment
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;