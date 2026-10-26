// Visual finishes for the full EA/SM/TM assemblies. Source assembly identities
// distinguish screws, hole surfaces, housings and the transparent pump head.
function classify(model) {
  const nodes = {};
  function walk(node, parent = '') {
    const name = parent + '/' + node.name;
    for (const i of node.meshes || []) nodes[i] = name;
    for (const child of node.children || []) walk(child, name);
  }
  walk(model.root);
  const family = model.name.slice(0, 2);
  const headY = family === 'SM' ? 95.5 : family === 'TM' ? 71
    : model.name === 'EA-0010ML' ? 115.5 : model.name === 'EA-0020ML' ? 164.5 : 93.8;
  const boxes = model.meshes.map(mesh => {
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    mesh.attributes.position.array.forEach((v, i) => { min[i % 3] = Math.min(min[i % 3], v); max[i % 3] = Math.max(max[i % 3], v); });
    return { min, max, size: max.map((v, i) => v - min[i]) };
  });
  const headMesh = boxes.findIndex(b => Math.abs(b.min[1] - headY) < .1 && b.size[0] > 15 && b.size[2] > 15 && b.size[1] > 15);
  if (headMesh < 0) throw Error(model.name + ': pump head not identified');
  const headNode = nodes[headMesh];
  return model.meshes.map((mesh, i) => {
    const node = nodes[i], b = boxes[i], name = mesh.name || '';
    let role = 3;
    if (node === headNode) role = 4;
    else if (/\/33[02]-/.test(node)) role = 3;
    else if (/445-/.test(name)) role = 0;
    else if (/342-/.test(name + node)) role = 2;
    else if (/411-/.test(name + node)) role = 0;
    else if (node === nodes[0]) {
      role = b.size[0] > 15 && b.size[2] > 15 ? (family === 'TM' ? 'motor-bands' : 1)
        : b.size[0] > 8 && b.size[2] > 5 && b.max[1] < 20 ? 0 : !name ? 1 : 3;
    } else if (b.min[1] < headY && b.size[0] > (family === 'EA' ? 30 : 15) && b.size[2] > (family === 'EA' ? 30 : 15)) {
      role = family === 'SM' ? 2 : 0;
    } else if (b.max[1] > headY + 5 && b.size[0] < 16 && b.size[2] < 16 && b.size[1] > 15) role = 5;
    return { role, node, ...b };
  });
}
module.exports = { classify };
