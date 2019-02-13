import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { BackRow } from "./styled/BackRow";
import { Cell } from "./styled/Cell";
import { ColumnHeaderRow } from "./styled/ColumnHeaderRow";
import { Table } from "./styled/Table";
import { SObjectTitleRow } from "./SObjectTitleRow";

type Props = {
    object: DescribeSObjectResult,
    onBack: () => void;
};

export function ObjectInfoChildRelationsTable({ object, onBack }: Props) {
    const rows = object.childRelationships.map((r) => {
        return <tr>
            <Cell>{r.relationshipName}</Cell>
            <Cell>{r.childSObject}</Cell>
            <Cell>{r.field}</Cell>
        </tr>;
    });
    return <Table>
        <BackRow onBack={onBack} colSpan={3} />
        <SObjectTitleRow object={object} colSpan={3} />
        <ColumnHeaderRow>{['子リレーション名', 'オブジェクト', '項目'].map(s => <td>{s}</td>)}</ColumnHeaderRow>
        {rows}
    </Table>;
}
