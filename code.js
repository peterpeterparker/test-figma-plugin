var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.ui.onmessage = msg => {
    figma.closePlugin(msg);
};
const exportSlide = (frameNode, index) => __awaiter(this, void 0, void 0, function* () {
    const svg = yield frameNode.exportAsync({ format: 'SVG' });
    figma.ui.postMessage({ svg, index });
});
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        figma.showUI(__html__, { visible: false });
        const selected = figma.currentPage.selection[0];
        if (selected && selected.type === 'FRAME') {
            yield exportSlide(selected, 0);
            return;
        }
        const nodes = figma.root.findAll(node => node.type === "FRAME");
        if (nodes) {
            const promises = nodes.map((node, i) => exportSlide(node, i));
            yield Promise.all(promises);
            return;
        }
        figma.closePlugin('Nothing to export');
    }
    catch (e) {
        console.error(e);
    }
}))();
