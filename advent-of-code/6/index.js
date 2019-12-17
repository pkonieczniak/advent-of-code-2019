
module.exports = function solve (universalOrbitMap) {
  const graph = parse(universalOrbitMap)
  const edges = countEdges(graph)
  const [YOU_ORBIT, SANTA_ORBIT] = ['YOU', 'SAN'].map(element => findClosestParent(graph, element))
  const commonAncestors = intersection(getAllAncestor(graph, YOU_ORBIT), getAllAncestor(graph, SANTA_ORBIT))
  return { edges, commonAncestors }
}

function parse (universalOrbitMap) {
  const graph = {}
  universalOrbitMap.forEach(relation => {
    const [node1, node2] = relation.split(')')
    if (!(graph[node1])) graph[node1] = {}
    if (!(graph[node2])) graph[node2] = {} 
    graph[node1][node2] = graph[node2]
  })
  return graph
}

function countEdges (graph, total = 0) {
  return Object.keys(graph).reduce((total, currentValue) => {
    return countEdges(graph[currentValue], total + Object.keys(graph[currentValue]).length)
  }, total)
}

function findClosestParent (graph, node) {
  return Object.keys(graph).find(key => {
    return Object.keys(graph[key]).includes(node)
  })
}

function getAllAncestor (graph, node, depth = 0, accumulator = []) {
  const nodes = Object.keys(graph)
  return nodes.reduce((accumulator, key) => {
    if (Object.keys(graph[key]).includes(node)) { 
      depth += 1
      accumulator.push({ key, depth }) 
      return getAllAncestor(graph, key, depth, accumulator)
    }
    return accumulator
  }, accumulator)
}

function intersection (parents1, parents2) {
  const commonAncestors = []
  for (let i = 0; i < parents1.length; i++) {
    for (let j = 0; j < parents2.length; j++) {
      if (parents1[i].key === parents2[j].key) {
        const key = parents1[i].key
        const depth = parents1[i].depth + parents2[j].depth
        commonAncestors.push({ key, depth })
      }
    }
  }
  commonAncestors.sort((a, b) => a.depth - b.depth)
  return commonAncestors
}