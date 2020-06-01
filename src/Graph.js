import React, { useState } from "react";
import { Button, FormControl } from 'react-bootstrap';

import {
    GraphView
} from "react-digraph";

import {
    default as nodeConfig,
    EMPTY_EDGE_TYPE,
    CUSTOM_EMPTY_TYPE,
    NODE_KEY,
    SPECIAL_EDGE_TYPE,
    SPECIAL_TYPE,
} from "./config";

import Header from "./Header";

import "./styles.css";

const Graph = () => {
    const [nodes, setNodes] = useState([]);

    const [edges, setEdges] = useState([]);
    const [menu, setMenu] = useState(false);
    const [nodeName, setName] = useState('');
    const [nodeNameError, setNameError] = useState(false);

    const [ selected, setSelected] = useState(null);

    const getNodeIndex = (searchNode) => {
        return nodes.findIndex(node => {
            return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    };

    const toggleMenu = () => {
        setMenu(!menu)
    };

    const getEdgeIndex = (searchEdge) => {
        return edges.findIndex(edge => {
            return (
                edge.source === searchEdge.source && edge.target === searchEdge.target
            );
        });
    };

    const randomInteger = (min, max) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    };

    const addStartNode = () => {

        if (nodeName === '' || nodes.some(node => node.title === nodeName)) {
            setNameError(true);
            return;
        }

        const newNodes = [
            {
                id: Date.now(),
                title: nodeName,
                type: CUSTOM_EMPTY_TYPE,
                x: randomInteger(1, 400),
                y: randomInteger(1, 400)
            },
            ...nodes
        ];
        setNodes(newNodes);
        setMenu(false);
        setNameError(false);
        setName('');
    };

    const onUpdateNode = viewNode => {

        const i = getNodeIndex(viewNode);

        nodes[i] = viewNode;
        setNodes(nodes);
    };

    const onSelectNode = (viewNode, event) => {
        const { id = "" } = event ? event.target : '' ;
        if (id.includes("text")) {
            document.getElementById(event.target.id).click();
        }

        setSelected(viewNode)
    };

    const onSelectEdge = viewEdge => {
        setSelected(viewEdge)
    };

    const onCreateNode = (x, y) => {

        const viewNode = {
            id: Date.now(),
            title: "",
            type: CUSTOM_EMPTY_TYPE,
            x,
            y
        };

        setNodes([...nodes, viewNode])
    };

    const onDeleteNode = (viewNode, nodeId, nodeArr) => {

        const newEdges = edges.filter((edge, i) => {
            return (
                edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]
            );
        });

        setEdges(newEdges);
        setNodes(nodeArr);
        setSelected(null);
    };

    const deleteNode = () => {
        const newNodes = nodes.filter(node => node.id !== selected.id);
        setNodes(newNodes);
        setSelected(null);
    };


    const onCreateEdge = (sourceViewNode, targetViewNode) => {

        const type =
            sourceViewNode.type === SPECIAL_TYPE
                ? SPECIAL_EDGE_TYPE
                : EMPTY_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type
        };


        if (viewEdge.source !== viewEdge.target) {
            setEdges([...edges, viewEdge]);
            setSelected(viewEdge);
        }
    };


    const onSwapEdge = (sourceViewNode, targetViewNode, viewEdge) => {
        const i = getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        edges[i] = edge;
        setEdges([...edges]);
        setSelected(edge);
    };


    const onDeleteEdge = (viewEdge, edges) => {
        setEdges(edges);
        setSelected(null);
    };

    const handleChange =event => {
        setName(event.target.value);
    };

    let rightOpen = menu ? 'open' : 'closed';

    return (
        <>
        <Header toggleMenu={toggleMenu}/>
        <div id='layout'>
            <div id='main'>
                <span>keyboard shortcuts: for create edges hold shift and click
                    mouse on nodes, for delete node press delete button</span>
                <div id="graph" style={{ height: "80vh" }}>
                    <GraphView
                        showGraphControls={true}
                        gridDotSize={1}
                        renderNodeText={false}
                        nodeKey={NODE_KEY}
                        nodes={nodes}
                        edges={edges}
                        selected={selected}
                        nodeTypes={nodeConfig.NodeTypes}
                        nodeSubtypes={nodeConfig.NodeSubtypes}
                        edgeTypes={nodeConfig.NodeTypes}
                        onSelectNode={onSelectNode}
                        onCreateNode={onCreateNode}
                        onUpdateNode={onUpdateNode}
                        onDeleteNode={onDeleteNode}
                        onSelectEdge={onSelectEdge}
                        onCreateEdge={onCreateEdge}
                        onSwapEdge={onSwapEdge}
                        onDeleteEdge={onDeleteEdge}
                        readOnly={false}
                    />
                </div>
            </div>

            <div id='right' className={rightOpen} >
                <div className={`sidebar ${rightOpen}`} >
                    <div className='content'>
                        <FormControl onChange={handleChange} value={nodeName}  placeholder="enter node name..." aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        {nodeNameError && <span>Enter valid name</span>}
                        <Button className="sidebar-button" onClick={addStartNode} variant="success">Save</Button>
                        {selected && <Button className="sidebar-button" onClick={deleteNode} variant="success">Delete</Button>}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Graph;