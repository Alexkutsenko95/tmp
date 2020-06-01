import React from "react";

export const NODE_KEY = "id";

export const CUSTOM_EMPTY_TYPE = "customEmpty"; // Empty node type
export const SPECIAL_TYPE = "special";
export const EMPTY_EDGE_TYPE = "emptyEdge";
export const SPECIAL_EDGE_TYPE = "specialEdge";

const CustomEmptyShape = (
    <symbol viewBox="0 0 200 200" id="customEmpty">
        <circle fill="#16A2B8" cx="100" cy="100" r="50" />
    </symbol>
);

const SpecialChildShape = (
    <symbol viewBox="0 0 154 154" id="specialChild">
        <rect
            x="2.5"
            y="0"
            width="154"
            height="154"
            fill="rgba(30, 144, 255, 0.12)"
        />
    </symbol>
);

const EmptyEdgeShape = (
    <symbol viewBox="0 0 50 50" id="emptyEdge">
        <circle cx="25" cy="25" r="8" fill="currentColor" />
    </symbol>
);

const SpecialEdgeShape = (
    <symbol viewBox="0 0 50 50" id="specialEdge">
        <rect
            transform="rotate(45)"
            x="27.5"
            y="-7.5"
            width="15"
            height="15"
            fill="currentColor"
        />
    </symbol>
);

export default {
    EdgeTypes: {
        emptyEdge: {
            shape: EmptyEdgeShape,
            shapeId: "#emptyEdge",
            typeText: "Empty"
        },
        specialEdge: {
            shape: SpecialEdgeShape,
            shapeId: "#specialEdge"
        }
    },
    NodeSubtypes: {
        specialChild: {
            shape: SpecialChildShape,
            shapeId: "#specialChild"
        }
    },
    NodeTypes: {
        customEmpty: {
            shape: CustomEmptyShape,
            shapeId: "#customEmpty",
            typeText: "Node"
        },
    }
};
