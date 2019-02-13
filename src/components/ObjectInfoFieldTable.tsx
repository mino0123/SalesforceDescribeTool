import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { BackRow } from "./styled/BackRow";
import { Cell } from "./styled/Cell";
import { ColumnHeaderRow } from "./styled/ColumnHeaderRow";
import { Table } from "./styled/Table";
import { SObjectTitleRow } from "./SObjectTitleRow";

type Props = {
    object: DescribeSObjectResult;
    onBack: () => void;
};

export function ObjectInfoFieldTable({ object, onBack }: Props) {
    const headerRow = <ColumnHeaderRow>{['ラベル', 'API参照名', '型', '選択肢 / 参照先', 'コンソール出力'].map(s => <td>{s}</td>)}</ColumnHeaderRow>;
    const rows = object.fields.map((f) => {
        const cells = [];
        cells.push(<Cell>{f.label}</Cell>);
        cells.push(<Cell>{f.name}</Cell>);
        cells.push(<Cell>{f.type}</Cell>);
        cells.push(<Cell>
            <PicklistEntryTable values={f.picklistValues} />
            <ReferenceToTable field={f} />
        </Cell>);
        cells.push(<Cell>
            <a onClick={() => console.log(f)} href="acout:blank" >log</a>
        </Cell>);
        return <tr>{cells}</tr>;
    });
    return <Table>
        <BackRow onBack={onBack} colSpan={5} />
        <SObjectTitleRow object={object} colSpan={5} />
        {headerRow}
        {rows}
    </Table>;
}

function PicklistEntryTable({ values }) {
    const rows = values.map(v => {
        return <tr><td>{v.value}</td></tr>;
    });
    return <table>{rows}</table>;
}

function ReferenceToTable({ field }) {
    const rows = (field.referenceTo || []).map(name => {
        return <tr><td>{name}</td></tr>;
    });
    return <table>{rows}</table>;
}
