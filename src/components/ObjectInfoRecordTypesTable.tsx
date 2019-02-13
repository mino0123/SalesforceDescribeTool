import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { BackRow } from "./styled/BackRow";
import { Cell } from "./styled/Cell";
import { ColumnHeaderRow } from "./styled/ColumnHeaderRow";
import { Table } from "./styled/Table";
import { SObjectTitleRow } from "./SObjectTitleRow";

export type Props = {
    object: DescribeSObjectResult,
    onBack: () => void;
};

export function ObjectInfoRecordTypesTable({ object, onBack }: Props) {
    const rows = object.recordTypeInfos.map((r) => {
        return <tr>
            <Cell>{r.developerName}</Cell>
            <Cell>{r.name}</Cell>
            <Cell>{r.master}</Cell>
            <Cell>{r.recordTypeId}</Cell>
            <Cell><a href="javascript:void 0;" onClick={() => console.log(r)}>コンソール出力</a></Cell>
        </tr>;
    });
    return <Table>
        <BackRow onBack={onBack} colSpan={5} />
        <SObjectTitleRow object={object} colSpan={5} />
        <ColumnHeaderRow>{['developerName', 'name', 'master', 'recordTypeId', ''].map(s => <td>{s}</td>)}</ColumnHeaderRow>
        {rows}
    </Table>;
}
