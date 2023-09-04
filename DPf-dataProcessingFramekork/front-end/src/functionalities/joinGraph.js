export function joinGraph(nodes, edges) {
	const graph = [];
	//TODO setup graph
	for (let i = 0; i < nodes.length; i++) {
		// loop through the nodes
		var newNode = {};
		newNode.name = nodes[i].data.name;
		newNode.type = nodes[i].type;
		newNode.module = nodes[i].data.scriptName;
		newNode.position = [];
		newNode.position[0] = nodes[i].position.x;
		newNode.position[1] = nodes[i].position.y;
		newNode.inputs = [];
		for (let j = 0; j < edges.length; j++) {
			// loop through edges
			if (edges[j].target == nodes[i].id) {
				newNode.inputs.push(nodes[edges[j].source].data.name);
			}
		}
		graph.push(newNode);
	}
	return graph;
}
