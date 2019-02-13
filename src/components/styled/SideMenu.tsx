import { h } from "preact";

type Item = {
    title: string;
};

type Props = {
    items: Item[]
    selected: string;
    onClick: (selected: string) => void;
};

export function SideMenu({ items, selected, onClick }: Props) {
    const itemElements = items.map((i) => {
        return <div onClick={() => onClick(i.title)} style={`
            border: 1px solid #CCC;
            cursor: pointer;
            font-weight: bold;
            color: #000;
            border-radius: 10px 0 0 10px;
            ${i.title === selected ? `background: #FFF;` : `background: #FF9;`}
        `}>
            <div style="margin-left: 2px;">{i.title}</div>
        </div>;
    });
    return <div style={`
        position:fixed;
        top: 90px;
        left: 5px;
        z-index: 10000;
    `}>{itemElements}</div>
}
