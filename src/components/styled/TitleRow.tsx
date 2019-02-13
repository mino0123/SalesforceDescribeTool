import { Component, h } from "preact";

export function TitleRow({ children, colSpan }: { children?: Component, colSpan: number }) {
    return <tr style={`
        background: #747e96;
        color: #EEE;
    `}>
        <th style="padding: 10px 100px;" colSpan={colSpan}>{children}</th>
    </tr>;
}
