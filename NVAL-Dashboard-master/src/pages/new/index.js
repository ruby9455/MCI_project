import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import "./index.css";
import Node from "./NodeAttr";
import Edge from "./EdgeAttr";
import data from "./config.json";
import { Link } from "react-router-dom";

import { getInfrastructuresList, submitInfrastructuresList } from "../../request";


export const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { label: "input node" },
        position: { x: 250, y: 5 },
    },
];

let id = 0;

const getId = () => `${id++}`;

const initFormData = {
    label: "",
    options: [],
};

const DnDFlow = () => {

    const pageIds = window.location.href.split('/');
    const pageId = pageIds[pageIds.length - 1];

    const reactFlowWrapper = useRef(null);
    const [nodeAttributes, setNodeAttributes] = useState({});
    const [currentNode, setCurrentNode] = useState(null);
    const [attributeList, setAttributeList] = useState([]);
    const [tipsNode, setTipsNode] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [canvasData, setCanvasData] = useState({});

    const getCanvasData = async () => {
        const data = await getInfrastructuresList();
        setCanvasData(data);
        onRestore(data)
    };

    const [formData, setFormData] = useState(initFormData);
    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const newFields = [...formData.options];
        newFields[index][name] = value;
        setFormData({ ...formData, options: newFields });
    };

    const handleAddOption = () => {
        setFormData((prevFormData) => {

            const newOption = { key: "", value: "" };
            const newOptions = [...prevFormData.options, newOption];

            return {
                ...prevFormData,
                options: newOptions,
            };
        });
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...formData.options];
        updatedOptions.splice(index, 1);
        setFormData({
            ...formData,
            options: updatedOptions,
        });
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = event.dataTransfer.getData("application/reactflow");

            const [color, title] = data.split("-");
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type: "default",
                position,
                style: {
                    background: color,
                    color: "white",
                },
                data: { label: title },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const [jsonData, setjsonData] = useState(data);

    const [nodeEditAttr, setnodeEditAttr] = useState(true);
    const [selectedNode, setSelectedNode] = useState();
    const processNodeEditAttr = (nodes) => {
        setnodeEditAttr(true);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].selected) {
                setnodeEditAttr(false);
                console.log(nodes[i].id);
                setSelectedNode(nodes[i].id);
            }
        }
    };

    const [edgeEditAttr, setedgeEditAttr] = useState(true);
    const [selectedEdge, setSelectedEdge] = useState();
    const processEdgeEditAttr = (edges) => {
        setedgeEditAttr(true);
        for (let i = 0; i < edges.length; i++) {
            if (edges[i].selected) {
                setedgeEditAttr(false);
                setSelectedEdge(edges[i].id);
            }
        }
    };

    // store the whole flow diagram and attributes
    var attMap = new Map(); // Map holding all stored attributes
    const flowKey = "flowDiagram" + pageId;

    const onLocalSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            if (canvasData[pageId]) {
                canvasData[pageId].flowData = flow;
                submitInfrastructuresList(canvasData);
            }
        }
    });

    const onSave = useCallback(() => {
        console.log("Save to JSON is clicked!");
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
        // adding stored attributes to the map
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("node_")) {
                if (attMap.has(key) == false) {
                    const value = localStorage.getItem(key);
                    attMap.set(key, value);
                }
            }
            if (key.startsWith("edge_")) {
                if (attMap.has(key) == false) {
                    const value = localStorage.getItem(key);
                    attMap.set(key, value);
                }
            }
        }
        const attObj = Object.fromEntries(attMap);
        localStorage.setItem("attMap", JSON.stringify(attObj));
        const resultObj = {};
        Object.entries(attObj).map(([key, value]) => {
            resultObj[key] = JSON.parse(value);
        })
        const content = JSON.stringify(resultObj);
        const a = document.createElement('a');
        a.href = 'data:text/plain;charset=utf-8,' + content;
        a.download = 'abc.json'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [reactFlowInstance]);


    // restore the stored diagram
    const onRestore = (data) => {
        if (data[pageId]) {
            const flowData = data[pageId].flowData;
            if (flowData) {
                // Take the largest id of the current process + 1 as the initial value of the new id
                id = Math.max(...flowData.nodes.map(item => Number(item.id))) + 1;
                setNodes(flowData.nodes || []);
                setEdges(flowData.edges || []);
            }
        }
    };

    // Verify that the connection is valid
    const isValidConnection = edge => {
        const { source, target } = edge;
        // Get the text content of the source and target nodes
        const sourceNode = nodes.find(({ id }) => id === source);
        const targetNode = nodes.find(({ id }) => id === target);
        if (sourceNode && targetNode) {
            const sourceNodeLabel = sourceNode.data?.label;
            const targetNodeLabel = targetNode.data?.label;
            const redLabel = 'COMPUTER', greenLabel = 'BLOCKCHAIN_NODE', blueLabel = 'BLOCKCHAIN_CHANNEL_NODE',
                yellowLabel = 'PROCESS';
            // Red cannot be connected to green, blue cannot be connected to yellow
            if (
                (sourceNodeLabel === redLabel && targetNodeLabel === greenLabel) ||
                (sourceNodeLabel === greenLabel && targetNodeLabel === redLabel) ||
                (sourceNodeLabel === blueLabel && targetNodeLabel === yellowLabel) ||
                (sourceNodeLabel === yellowLabel && targetNodeLabel === blueLabel)
            ) return false;
        }
        return true;
    };

    // click nodes
    const onNodeClick = (e, node) => {
        setCurrentNode(node);
        let _item = localStorage.getItem(`node_${node.id}`);
        if (_item) {
            _item = JSON.parse(_item);
        }
        const attributes =
            _item ?? nodeAttributes[node.id] ?? initFormData;
        setFormData(attributes);
    };

    // mouse move to nodes
    const onNodeMouseEnter = (e, node) => {
        if (!nodeAttributes[node.id]) {
            let _item = localStorage.getItem(`node_${node.id}`);
            if (_item) {
                setNodeAttributes((value) => ({
                    ...value,
                    [node.id]: JSON.parse(_item),
                }));
            }
        }

        setTipsNode(node);
    };

    // mouse move out nodes
    const onNodeMouseLeave = _ => {
        setTipsNode(null);
    };

    // remove nodes
    const onNodesDelete = (nodes) => {
        nodes.forEach(node => {
            const nodeId = `node_${node.id}`;
            localStorage.removeItem(nodeId);
        });
        setCurrentNode(null);
        setFormData(initFormData);
        setTipsNode(null);
    };

    // click the edges
    const onEdgeClick = (e, edge) => {
        setCurrentNode(edge);
        let _item = localStorage.getItem(`node_${edge.id}`);
        if (_item) {
            _item = JSON.parse(_item);
        }
        const attributes =
            _item ?? nodeAttributes[edge.id] ?? initFormData;
        setFormData(attributes);
    }

    const onEdgeMouseEnter = (e, node) => {
        if (!nodeAttributes[node.id]) {
            let _item = localStorage.getItem(`node_${node.id}`);
            if (_item) {
                setNodeAttributes((value) => ({
                    ...value,
                    [node.id]: JSON.parse(_item),
                }));
            }
        }

        setTipsNode(node);
    };


    const onEdgeMouseLeave = _ => {
        setTipsNode(null);
    };

    const onEdgesDelete = (edges) => {
        edges.forEach(edge => {
            const edgeId = `node_${edge.id}`;
            localStorage.removeItem(edgeId);
        });
        setCurrentNode(null);
        setFormData(initFormData);
        setTipsNode(null);
    };

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                {nodeEditAttr && edgeEditAttr && <Sidebar />}
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        isValidConnection={isValidConnection}
                        onInit={instance => {
                            setReactFlowInstance(instance);
                            getCanvasData();
                        }}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={onNodeClick}
                        onNodeMouseEnter={onNodeMouseEnter}
                        onNodeMouseLeave={onNodeMouseLeave}
                        onNodesDelete={onNodesDelete}
                        onEdgeClick={onEdgeClick}
                        onEdgeMouseEnter={onEdgeMouseEnter}
                        onEdgeMouseLeave={onEdgeMouseLeave}
                        onEdgesDelete={onEdgesDelete}
                        fitView
                    >
                        <div className="saveControls">
                            <Link to={{
                                pathname: `/infrastructures`,
                            }}>
                                <button className="control" onClick={onLocalSave}>
                                    Save
                                </button>
                            </Link>
                        </div>
                        <Controls />
                    </ReactFlow>
                </div>
                {!nodeEditAttr && edgeEditAttr && <Node id={selectedNode} />}
                {nodeEditAttr && !edgeEditAttr && <Edge id={selectedEdge} />}
            </ReactFlowProvider>
            {tipsNode ? (
                <div className={"tips-bg"}>
                    <div className={"tips-container"}>
                        {nodeAttributes[tipsNode.id] ? (
                            <>
                                <div className={"row"}>
                                    <div className={"name"}>Node ID</div>
                                    <div className={"value left"}>
                                        {" "}
                                        {"" === nodeAttributes[tipsNode.id].label
                                            ? tipsNode.id
                                            : nodeAttributes[tipsNode.id].label}
                                    </div>
                                </div>
                                {nodeAttributes[tipsNode.id].options?.map((item, index) => (
                                    <div className={"row top"} key={index}>
                                        <div className={"name"}>{item.key}</div>
                                        <div className={"value left"}>{item.value}</div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className={"row"}>
                                <div className={"name"}>Node ID</div>
                                <div className={"value left"}> {tipsNode.id}</div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
            {currentNode ? (
                <div className={"add-attribute-container"}>
                    <div className={"header"}>
                        Edit Attribute For Node{" "}
                        {"" === formData.label ? currentNode.id : formData.label}
                    </div>
                    <div>
                        <span>ID: </span>
                        <input
                            value={formData.label}
                            onChange={(event) =>
                                setFormData({ ...formData, label: event.target.value })
                            }
                        />
                    </div>

                    {formData.options?.map((option, index) => {
                        return (
                            <div key={index} className={"attributes-row"}>
                                <select
                                    name={"key"}
                                    value={option.key}
                                    onChange={(event) => {
                                        handleInputChange(event, index);
                                    }}
                                >
                                    {jsonData["nodeAttributes"].map((attributes) => {
                                        return (
                                            <option value={attributes.option}>
                                                {attributes.option}
                                            </option>
                                        );
                                    })}
                                </select>
                                <input
                                    name={"value"}
                                    value={option.value}
                                    onChange={(event) => handleInputChange(event, index)}
                                />
                                <div
                                    className={"delete-btn"}
                                    onClick={() => {
                                        handleRemoveOption(index);
                                    }}
                                >
                                    Del
                                </div>
                            </div>
                        );
                    })}
                    <div className={"btn-container"}>
                        <div
                            className={"add-btn"}
                            onClick={() => {
                                handleAddOption();
                            }}
                        >
                            Add
                        </div>
                        <div
                            className={"save-btn"}
                            onClick={() => {
                                nodes.forEach(item => {
                                    if (item.id === currentNode.id) {
                                        item.data.label = formData.label;
                                    }
                                })
                                setNodes(JSON.parse(JSON.stringify(nodes)));
                                setNodeAttributes((value) => ({
                                    ...value,
                                    [currentNode.id]: formData,
                                }));
                                // setNodes((nodes) => {
                                //     const newNodes = [...nodes];
                                //     newNodes[currentNode.id] = {
                                //         ...newNodes[currentNode.id],
                                //         data: {
                                //             ...newNodes[currentNode.id].data,
                                //             label: formData.label,
                                //         },
                                //     };
                                //     return newNodes;
                                // });
                                localStorage.setItem(
                                    `node_${currentNode.id}`,
                                    JSON.stringify(formData)
                                );
                                setCurrentNode(null);
                                setFormData(initFormData);
                            }}
                        >
                            Save
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default DnDFlow;
