// import visualization libraries {
const {
	GraphTracer,
	Layout,
	Tracer
} = require("algorithm-visualizer")
// }

// define tracer variables {
const graph = new GraphTracer("Minimum Spanning Tree")
Layout.setRoot(graph)
// }

// define input variables
const vertices = [
	"Minneapolis",
	"Milwaukee",
	"Detroit",
	"Chicago",
	"St. Louis",
	"Nashville",
	"Louisville",
	"Cincinnati"
]
const edges = [
	["Chicago", "Milwaukee", 74],
	["Louisville", "Cincinnati", 83],
	["Nashville", "Louisville", 151],
	["Detroit", "Cincinnati", 230],
	["St. Louis", "Louisville", 242],
	["Chicago", "St. Louis", 262],
	["Chicago", "Louisville", 269],
	["Detroit", "Louisville", 306],
	["Milwaukee", "Louisville", 348],
	["Minneapolis", "Chicago", 355],
	["Minneapolis", "Nashville", 695]
]

for (let i of vertices) graph.addNode(i)

const cEdges = []
const calculateCircuit = edges => {
	const connections = []

	const findConnections = edgeName => {
		for (const i in connections) {
			if (connections[i].includes(edgeName))
				return { i, c: connections[i] }
		}
		return { i: -1, c: null }
	}

	for (const edge of edges) {
		const [edge1name, edge2name] = edge

		const { i: i1, c: edge1connections } = findConnections(edge1name)
		const { i: i2, c: edge2connections } = findConnections(edge2name)

		if (edge1connections && !edge2connections) {
			connections[i1] = [...connections[i1], edge2name]
		}

		if (edge2connections && !edge1connections) {
			connections[i2] = [...connections[i2], edge1name]
		}

		if (edge1connections && edge2connections) {
			if (i1 === i2) return true
			connections[i1] = [...connections[i1], ...connections[i2]]
			connections.splice(i2, 1)
		}

		if (!edge1connections && !edge2connections) {
			connections.push([edge1name, edge2name])
		}
	}

	return false
}

for (let sEdge of edges) {
	graph.addEdge(sEdge[0], sEdge[1])
	cEdges.push(sEdge)
	const hasCircuit = calculateCircuit(cEdges)
	Tracer.delay()

	if (hasCircuit) {
		graph.removeEdge(sEdge[0], sEdge[1])
		cEdges.pop()
		Tracer.delay()
	}
}