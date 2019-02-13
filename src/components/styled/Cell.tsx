import { h } from "preact";

export function Cell(props) {
    return <td style="border: 1px dotted #CCC;">{props.children}</td>
}
