
/*
For the time being, I just decided to include this in 
the same .js file as simplegrapheditor
*/

import {createCircleNode} from "./circlenode"
import {createLineEdge} from "./lineedge"


function createSimpleGraph() {
    return {
        getNodePrototypes: () => {
            nodeTypes = [
                createCircleNode("black"),
                createCircleNode("white"),
            ]
            return nodeTypes
        }, 
        getEdgePrototypes: () => {
            edgeTypes = [
                createLineEdge(),
            ]
            return edgeTypes
        }
    }
}

//module.exports = {createSimpleGraph}