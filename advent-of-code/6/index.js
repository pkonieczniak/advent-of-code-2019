module.exports = function getOrbits (map) {
  const nodes = {}
  map.forEach(relation => {
    const [node1, node2] = relation.split(')')
    if (!(nodes[node1])) {
      nodes[node1] = {}
    }
    if (!(nodes[node2])) { 
      nodes[node2] = {} 
    }
    nodes[node1][node2] = nodes[node2]
  }) 
  let total = { result: 0 }
  walk(nodes, total)
  function walk (nodes, total = {}) {
    for (let node in nodes) {
      const children = Object.keys(nodes[node])
      total.result += children.length   
      walk(nodes[node], total)
    }
  } 
  return total.result
}
