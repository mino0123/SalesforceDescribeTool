import { h } from "preact";
import { SideMenu } from "./styled/SideMenu";

export const ObjectInfoMode = {
    Fields: '項目',
    ChildRelations: '子リレーション',
    RecordTypes: 'レコードタイプ',
    Others: 'その他'
};

export type Props = {
    selected: string,
    onClick: (selected: string) => void;
};

export function ObjectInfoSideMenu({ selected, onClick }: Props) {
    const items = [
        { title: ObjectInfoMode.Fields },
        { title: ObjectInfoMode.ChildRelations },
        { title: ObjectInfoMode.RecordTypes },
        { title: ObjectInfoMode.Others }
    ];
    return <SideMenu items={items} selected={selected} onClick={onClick} />;
}
