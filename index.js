import { Picture } from "./model/model.js";
import { PixelEditor } from "./app.js";
import { draw, fill, rectangle, pick } from "./model/tools.js";
import { ToolSelect } from "./view/tool-select.js";
import { ColorSelect } from "./view/color-select.js";
import { SaveButton, LoadButton, UndoButton } from "./view/buttons.js";
import { historyUpdateState } from "./model/reducer.js";


// function updateState(state, action) {
//     //return Object.assign({}, state, action);
//     return {...state, ...action };
// }

const startState = {
    tool: "draw",
    color: "#806826",
    picture: Picture.empty(85, 55, "#FFF5C2"),
    done: [],
    doneAt: 0
};

const baseTools = { draw, fill, rectangle, pick };

const baseControls = [
    ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({
    state = startState,
    tools = baseTools,
    controls = baseControls
}) {
    let app = new PixelEditor(state, {
        tools,
        controls,
        dispatch(action) {
            state = historyUpdateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
}

document.querySelector("div").appendChild(startPixelEditor({}));