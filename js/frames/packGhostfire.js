//Create objects for common properties across available frames
// var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
//defines available frames

availableFrames = [
    {   name: "Frame", 
        src: "/img/frames/ghostfire/frame.png",
    },
    {
        name: "Power/Toughness",
        src: "/img/frames/ghostfire/pt.png", bounds:{ y: -0.003, x: -0.001 },
    },
    {
        name: "BorderlessFrame",
        src: "/img/frames/ghostfire/bFrame.png",
    },
];
//disables/enables the "Load Frame Version" button
document.querySelector("#loadFrameVersion").disabled = false;
//defines process for loading this version, if applicable
document.querySelector("#loadFrameVersion").onclick = async function () {
    //resets things so that every frame doesn't have to
    await resetCardIrregularities();
    //sets card version
    card.version = "Ghostfire";
    card.artBounds = { x: 0, y: 0, width: 1, height: 1 };
    autoFitArt();
    //set symbol bounds
    card.setSymbolBounds = {
        x: 0.9401,
        y: 0.5442,
        width: 0.12,
        height: 0.041,
        vertical: "center",
        horizontal: "right",
    };
    resetSetSymbol();
    //watermark bounds
    card.watermarkBounds = { x: 0.5, y: 0.73, width: 0.75, height: 0.2305 };
    resetWatermark();
    //text
    loadTextOptions({
        mana: {
            name: "Mana Cost",
            text: "",
            y: 0.0646,
            width: 0.9292,
            height: 71 / 2100,
            oneLine: true,
            size: 71 / 1638,
            align: "right",
            shadowX: -0.001,
            shadowY: 0.0029,
            manaCost: true,
            manaSpacing: 0,
        },
        title: {
            name: "Title",
            text: "",
            x: 0.0854,
            y: 0.0522,
            width: 0.8292,
            height: 0.0543,
            oneLine: true,
            font: "belerenb",
            size: 0.0381,
            color: "white",
        },
        type: {
            name: "Type",
            text: "",
            x: 0.0854,
            y: 0.5155,
            width: 0.8292,
            height: 0.0543,
            oneLine: true,
            font: "belerenb",
            size: 0.0324,
            color: "white",
        },
        rules: {
            name: "Rules Text",
            text: "",
            x: 0.086,
            y: 0.5853,
            width: 0.828,
            height: 0.281,
            size: 0.0362,
            color: "white",
        },
        pt: {
            name: "Power/Toughness",
            text: "",
            x: 0.7928,
            y: 0.889,
            width: 0.1367,
            height: 0.0372,
            size: 0.0372,
            font: "belerenbsc",
            oneLine: true,
            align: "center",
            color: "white",
        },
    });
};
//loads available frames
loadFramePack();
