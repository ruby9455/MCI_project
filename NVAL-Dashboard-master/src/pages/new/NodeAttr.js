import React, { useState, useEffect } from "react";
import DnDFlow from "./index";
import "./styles.css";

function AttributeDialog({ node, onClose, onSave, initialValues }) {
  const [attributes, setAttributes] = useState(initialValues || []);

  function handleAddAttribute() {
    setAttributes([...attributes, ""]);
  }

  function handleAttributeChange(index, value1, value2) {
    setAttributes([
      ...attributes.slice(0, index),
      [value1, value2],
      ...attributes.slice(index + 1),
    ]);
  }

  function handleDeleteAttribute(index) {
    setAttributes([
      ...attributes.slice(0, index),
      ...attributes.slice(index + 1),
    ]);
    console.log(attributes);
  }

  function handleSave() {
    onSave(node, attributes);
    onClose();
  }

  const [selected, setSelected] = useState();

  return (
    <div>
      <p>
        key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;content
      </p>
      {attributes.map((attribute, index) => (
        <div key={index}>
          <select
            id='attKey'
            value={attribute[0]}
            onChange={ (e) => {
              if (attribute[1]) {
                handleAttributeChange(index, e.target.value, attribute[1]);
              }
              else {
                handleAttributeChange(index, e.target.value, "");
              }
              setSelected(e.target.value);
            }}
          >
            <option value1="option1">Option</option>
            <option value1="option2">NodeID</option>
            <option value1="option3">NodeType</option>
            <option value1="option4">Architecture</option>
            <option value1="option5">hostName</option>
          </select>
          <input
            type="text"
            value={attribute[1]}
            onChange={(event) => {
              if (attribute[0]) {
                handleAttributeChange(index, attribute[0], event.target.value);
              }
              else {
                handleAttributeChange(index, "", event.target.value);
              }
            }}
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

  // const handleAttributeSave = (id, attributes) => {
  //   console.log(`Attributes for Node ${id}: ${attributes.join(", ")}`);
  //   localStorage.setItem(`node_${id}`, JSON.stringify(attributes));
  //   this.props.parentFunction(id);
  // };

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
          Edit attributes for Node
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
