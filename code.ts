


figma.ui.onmessage = msg => {
  figma.closePlugin(msg)
}

(async () => {
    try {
      figma.showUI(__html__, { visible: false })

      const nodes = figma.root.findAll();

// nodes.forEach(node =>  console.log(node));

      const selected = figma.currentPage.selection[0];
      console.log('Node', selected);

      const svg = await selected.exportAsync({format: 'SVG'})
      figma.ui.postMessage({ svg })

      console.log('Postmsg done')
    } catch (e) {
        console.error(e);
    }
})();
