import React, {useState} from "react";
import data from "./config.json";

export default () => {
    const onDragStart = (event, color, title) => {
        event.dataTransfer.setData("application/reactflow", `${color}-${title}`);
        event.dataTransfer.effectAllowed = "move";
    };

    const [jsonData, setjsonData] = useState(data);

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>

            {jsonData['nodes'].map((node) => {
                return (
                    <div
                        key={node.id}
                        className={"dndnode input node-style"}
                        style={{background: node.color}}
                        onDragStart={(event) =>
                            onDragStart(event, node.color, node.name)
                        }
                        draggable
                    >
                        {node.name}
                    </div>
                );
            })}
        </aside>
    );
};
