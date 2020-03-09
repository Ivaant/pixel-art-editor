function elt(tag, props, ...children) {
    let domElem = document.createElement(tag);
    if (props)
        domElem = Object.assign(domElem, props);
    for (let child of children) {
        if (typeof child != "string") domElem.appendChild(child);
        else domElem.appendChild(document.createTextNode(child));
    }
    return domElem;
}

const scale = 10;

function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale)
    };
}

function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            cx.fillStyle = picture.pixel(x, y);
            cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

export { elt, scale, pointerPosition, drawPicture };