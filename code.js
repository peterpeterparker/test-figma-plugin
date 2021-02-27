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
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        figma.showUI(__html__, { visible: false });
        const nodes = figma.root.findAll();
        // nodes.forEach(node =>  console.log(node));
        const selected = figma.currentPage.selection[0];
        console.log('Node', selected);
        const svg = yield selected.exportAsync({ format: 'SVG' });
        figma.ui.postMessage({ svg });
        console.log('Postmsg done');
    }
    catch (e) {
        console.error(e);
    }
}))();
