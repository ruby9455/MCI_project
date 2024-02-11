import React, { useState, useEffect } from "react";
import "./styles.css";

function AttributeDialog({ edge, onClose, onSave, initialValues }) {
  const [attributes, setAttributes] = useState(initialValues || []);

  function handleAddAttribute() {
    setAttributes([...attributes, ""]);
  }

  function handleAttributeChange(index, value) {
    setAttributes([
      ...attributes.slice(0, index),
      value,
      ...attributes.slice(index + 1),
    ]);
  }

  function handleDeleteAttribute(index) {
    setAttributes([
      ...attributes.slice(0, index),
      ...attributes.slice(index + 1),
    ]);
  }

  function handleSave() {
    onSave(edge, attributes);
    onClose();
  }

  return (
    <div>
      <p>
        key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content
      </p>
      {attributes.map((attribute, index) => (
        <div key={index}>
          <input
            type="text"
            value={attribute}
            onChange={(event) =>
              handleAttributeChange(index, event.target.value)
            }
          />
          <button onClick={() => handleDeleteAttribute(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddAttribute}>Add Attribute</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function Edge({ id }) {
  const [showDialog, setShowDialog] = useState(false);

  function handleEdgeClick() {
    setShowDialog(true);
  }

  function handleAttributeSave(id, attributes) {
    console.log(`Attributes for Edge ${id}: ${attributes.join(", ")}`);
    localStorage.setItem(`edge_${id}`, JSON.stringify(attributes));
  }

  useEffect(() => {
    const savedAttributes = JSON.parse(localStorage.getItem(`edge_${id}`));
    if (savedAttributes) {
      setShowDialog(true);
    }
  }, [id]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleEdgeClick();
          }}
          className="button-style"
        >
          Edit attributes for edge
        </button>
      </div>
      {showDialog && (
        <AttributeDialog
          edge={id}
          onClose={() => setShowDialog(false)}
          onSave={handleAttributeSave}
          initialValues={JSON.parse(localStorage.getItem(`edge_${id}`))}
        />
      )}
    </div>
  );
}

export default Edge;
