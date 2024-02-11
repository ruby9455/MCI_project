import React, { useState, useEffect } from "react";
import "./styles.css";

function AttributeDialog({ node, onClose, onSave, initialValues }) {
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
    onSave(node, attributes);
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

function Node({ id }) {
  const [showDialog, setShowDialog] = useState(false);

  function handleNodeClick() {
    setShowDialog(true);
  }

  function handleAttributeSave(id, attributes) {
    console.log(`Attributes for Node ${id}: ${attributes.join(", ")}`);
    localStorage.setItem(`node_${id}`, JSON.stringify(attributes));
  }

  useEffect(() => {
    const savedAttributes = JSON.parse(localStorage.getItem(`node_${id}`));
    if (savedAttributes) {
      setShowDialog(true);
    }
  }, [id]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleNodeClick();
          }}
          className="button-style"
        >
          Edit attributes for Node {id}
        </button>
      </div>
      {showDialog && (
        <AttributeDialog
          node={id}
          onClose={() => setShowDialog(false)}
          onSave={handleAttributeSave}
          initialValues={JSON.parse(localStorage.getItem(`node_${id}`))}
        />
      )}
    </div>
  );
}

export default Node;
