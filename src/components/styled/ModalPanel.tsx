import { h } from "preact";

export function ModalPanel(props: {
    onModalClick: (MouseEvent) => void
 }) {
    const modalCss = `
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        background: black;
        top: 0;
        left: 0;
        z-index: 200;
    `;
    const panelCss = `
        position: absolute;
        top: 50px;
        left: 90px;
        background: white;
        z-index: 210;
        border-radius: 10px;
        padding: 10px;
    `;
    return <div style={`
        position: absolute;
        top: 0;
        left: 0;
    `}>
        <div style={modalCss} onClick={props.onModalClick} ></div>
        <div style={panelCss}>
            {(props as any).children}
        </div>
    </div>;
}
