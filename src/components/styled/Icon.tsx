import { h } from "preact";

export const Icon = (props: { onClick: (MouseEvent) => void }) => {
    return (<div style={`
        width:10px;
        height:10px;
        position:absolute;
        background:black;
        top:10px;
        left:10px;
        cursor: pointer;
    `} onClick={props.onClick} ></div>);
};
