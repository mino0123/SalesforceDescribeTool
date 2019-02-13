
import * as chunk from "chunk";
import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { BackRow } from "./styled/BackRow";
import { Cell } from "./styled/Cell";
import { Table } from "./styled/Table";
import { SObjectTitleRow } from "./SObjectTitleRow";


const BLACKLIST = [
    'fields',
    'childRelationships',
    'recordTypeInfos'
];

type Props = {
    object: DescribeSObjectResult,
    onBack: () => void;
};

export function ObjectInfoOthersTable({ object, onBack }: Props) {
    const [headerCells, valueCells] = Object.keys(object).filter(p => !BLACKLIST.includes(p)).reduce(([headers, values], p) => {
        const v = object[p];
        let valueElement;
        if (v == null || (Array.isArray(v) && v.length === 0)) {
            valueElement = null;
        } else if (Array.isArray(v)) {
            if (typeof v[0] === 'string') {
                valueElement = StringArrayValue(v);
            } else {
                valueElement = ConsoleOutput(v);
            }
        } else if (typeof v !== 'object') {
            valueElement = String(v);
        } else {
            valueElement = ConsoleOutput(v);
        }
        return [
            headers.concat(<Cell>{p}</Cell>),
            values.concat(<Cell>{valueElement}</Cell>)
        ];
    }, [[],[]]);
    const headerRowCells = chunk(headerCells, 5);
    const valueRowCells = chunk(valueCells, 5);
    const rows = [];
    headerRowCells.forEach((_, i) => {
        rows.push(<tr style={`background: #ccc;`}>{headerRowCells[i]}</tr>);
        rows.push(<tr>{valueRowCells[i]}</tr>);
    });
    return <Table>
        <BackRow onBack={onBack} colSpan={5} />
        <SObjectTitleRow object={object} colSpan={5} />
        {rows}
    </Table>
}

function StringArrayValue(array) {
    const items = array.map(i => <li>{i}</li>);
    return <ul>{items}</ul>;
}

function ConsoleOutput(array) {
    return <a href="javascript:void 0;" onClick={() => console.log(array)}>コンソール出力</a>
}

