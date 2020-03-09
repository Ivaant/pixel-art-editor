import { elt } from "./view/helpers.js";
import { PictureCanvas } from "./view/canvas.js";

class PixelEditor {
    constructor(state, config) {
        let { tools, controls, dispatch } = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) return pos => onMove(pos, this.state);
        });
        this.controls = controls.map(
            Control => new Control(state, config));
        this.dom = elt("div", { tabIndex: 0, onkeydown: (event) => keyHandler(event, tools, dispatch) }, this.canvas.dom, elt("br"),
            ...this.controls.reduce(
                (a, c) => a.concat(" ", c.dom), []));
    }
    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) ctrl.syncState(state);
    }
}

function keyHandler(event, tools, dispatch) {
    const keyLetter = event.key;
    if (event.key == "z" && event.ctrlKey || event.metaKey) {
        event.preventDefault();
        dispatch({ undo: true });
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
        const toolNames = Object.keys(tools);
        const toolLetters = toolNames.map(name => name.slice(0, 1)).join("");
        const toolIndex = toolLetters.indexOf(keyLetter);
        if (toolIndex !== -1) dispatch({ tool: toolNames[toolIndex] });
    }

}


export { PixelEditor };