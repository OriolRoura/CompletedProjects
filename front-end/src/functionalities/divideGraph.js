import {conectionPath} from '../API/globals'
import { MarkerType } from 'reactflow';
import { markerEndStyle } from './markerEndStyle';

export function divideGraph(initialGraph) {
  const nodes = [];
  const edges = [];
 /*
  const modules = fetch(conectionPath +'/module')
  .then((response) => {console.log(response);return response.json()})
  .then((json) => {
    console.log(json);
    modules = json
  });*/

  //setup nodes
  for (let i = 0; i < initialGraph.length; i++) {
    var newNode = {};
    newNode.id = `${i}`;
    newNode.type = initialGraph[i].type;
    newNode.position = { x: initialGraph[i].position[0], y: initialGraph[i].position[1] };
    newNode.data = {};
    newNode.type = initialGraph[i].type;
    newNode.data.type = initialGraph[i].type;
    newNode.data.scriptName = initialGraph[i].module
    newNode.data.script = initialGraph[i].module
    newNode.data.id = i
    newNode.data.name = initialGraph[i].name
    nodes.push(newNode);
  }
  //setup edges
  for (var i = 0; i < initialGraph.length; i++) {
    for (var j = 0; j < initialGraph[i].inputs.length; j++){
        var newEdges = {};
        var sourceNodeId = getNodeId(initialGraph[i].inputs[j], initialGraph);
        var targetNodeId = i;
        newEdges.id = sourceNodeId + "-" + targetNodeId;
        newEdges.source = `${sourceNodeId}`;
        newEdges.target = `${targetNodeId}`;
        newEdges.animated = false
        //newEdges.data.type = ''
        //newEdges.data.type = getEdgeType(initialGraph[i])
        //newEdges.label = `${getEdgeType(initialGraph[sourceNodeId], modules)}` TODO we need to change graph structure to show edge type
        newEdges.markerEnd = markerEndStyle  
        edges.push(newEdges);
    }
  }

  //console.log(nodes);
  //console.log(edges);
  return {
    initialNodes: nodes, 
    initialEdges: edges,
  };
}

function getNodeId(nodeName, graph) {
  for (let i = 0; i < graph.length; i++)
    if (graph[i].name === nodeName) 
        return graph.indexOf(graph[i]);
}

function getEdgeType(node, modules) {
  const module = node.module
  //console.log(module)
  var type
  for (var i = 0; i < modules.length; i++) {
    console.log(modules[i].name)
    console.log(module)
    if(module == modules[i].name){
      type = modules[i].type
    }
  }
  //console.log(type)
  return type 
}