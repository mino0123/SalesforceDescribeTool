import { h } from "preact";

export function Table(props: {children?, wrap?}) {
    return <table style={`
        border-collapse: collapse;
        border: 1px dotted #CCC;
        ${props.wrap === true ? `` : `white-space: nowrap;`}
    `}>
        {props.children}
    </table>;
}