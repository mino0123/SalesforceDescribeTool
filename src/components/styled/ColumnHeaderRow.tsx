import { h, Component } from "preact";

export function ColumnHeaderRow({ children }: { children?: Component[] }) {
    return <tr style="background: #ccc;">{children}</tr>
}
