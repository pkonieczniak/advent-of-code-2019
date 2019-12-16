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
  const YOU_ORBIT = Object.keys(nodes).find(key => {
    return Object.keys(nodes[key]).includes('YOU')
  })
  const SANTA_ORBIT = Object.keys(nodes).find(key => {
    return Object.keys(nodes[key]).includes('SAN')
  })
  let counter = { counter: 0 }
  const parents1 = []
  const parents2 = []
  function find (node, parents) {
    for (let key in nodes) {
      if (Object.keys(nodes[key]).includes(node)) {
        parents.push({ key, depth: counter.counter += 1 })
        // counter.counter += 1
        find(key, parents)
      }
    }
  }
  find(SANTA_ORBIT, parents1)
  counter.counter = 0
  find(YOU_ORBIT, parents2)
  const common_parents = [...intersection(parents1, parents2)]
}

function intersection (a, b) {
  const common_keys = []
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i].key === b[j].key) {
        common_keys.push({ key: a[i].key, depth: a[i].depth + b[j].depth })
      }
    }
  }
  return common_keys
}