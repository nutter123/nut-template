export default (tree) => {
  //每个节点与其子节点进行计算深度值
  function computedDeep(node, deep) {
    var deepMax = -1;

    function recurChild(node, deep) {
      if (node.list.length == 0) {
        deepMax = Math.max(deepMax, deep);
        return;
      } else {
        for (var i = 0; i < node.list.length; i++) {
          recurChild(node.list[i], deep + 1);
        }
      }
    }
    recurChild(node, deep);

    return deepMax;
  }

  //遍历所有节点算出deep字段
  function addLevelDeep(tree, deep, level) {
    if (tree.length == 0) return;
    else {
      for (var k = 0; k < tree.length; k++) {
        var item = tree[k];
        item.deep = computedDeep(item, deep);
        item.level = level;
        addLevelDeep(item.list, 0, level + 1);
      }
    }
  }

  addLevelDeep(tree, 0, 1);
  return tree;
};
