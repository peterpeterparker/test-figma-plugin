


figma.ui.onmessage = msg => {
  figma.closePlugin(msg)
}

const exportSlide = async (frameNode, index) => {
    const svg = await frameNode.exportAsync({format: 'SVG', svgOutlineText: false})
    figma.ui.postMessage({ svg, index })
}

(async () => {
    try {
      figma.showUI(__html__, { visible: false })

        const selected = figma.currentPage.selection[0];

      if (selected && selected.type === 'FRAME') {
          await exportSlide(selected, 0);
          return;
      }

      const nodes = figma.root.findAll(node => node.type === "FRAME");
      if (nodes) {
          const promises = nodes.map((node, i) => exportSlide(node, i));
          await Promise.all(promises);

          return;
      }

      figma.closePlugin('Nothing to export');
    } catch (e) {
        console.error(e);
    }
})();
