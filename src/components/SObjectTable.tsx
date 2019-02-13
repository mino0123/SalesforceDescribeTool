import * as chunk from "chunk";
import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { Table } from "./styled/Table";

export type GroupingRule = {
    title: string;
    order: number;
    judgeOrder: number;
    match: (SObjectInfo) => boolean;
}

const COLUMNS_PER_ROW = 5

const GROUPING_RULES: GroupingRule[] = [
    {
        title: '標準',
        order: 10000,
        judgeOrder: 1,
        match: (o) => ['Account', 'Contact', 'Opportunity'].indexOf(o.name) >= 0
    },
    {
        title: 'カスタム',
        order: 9000,
        judgeOrder: 1,
        match: (o) => o.custom
    },
    {
        title: 'その他',
        order: 0,
        judgeOrder: 0,
        match: (o) => true
    },
    {
        title: 'パッケージ',
        order: 8000,
        judgeOrder: 2,
        match: (o) => /__/.test(o.name.replace('__c', ''))
    },
    {
        title: '履歴',
        order: -1000,
        judgeOrder: 1,
        match: (o) => o.name.endsWith('History')
    },
    {
        title: '変更イベント',
        order: -1000,
        judgeOrder: 1,
        match: (o) => o.name.endsWith('ChangeEvent')
    },
    {
        title: 'フィード',
        order: -1000,
        judgeOrder: 1,
        match: (o) => o.name.endsWith('Feed')
    },
    {
        title: '共有',
        order: -1000,
        judgeOrder: 1,
        match: (o) => o.name.endsWith('Share')
    }
];

type Props = {
    sobjects: DescribeSObjectResult[],
    onSObjectClick: (object: DescribeSObjectResult) => void;
};

export function SObjectTable({ sobjects, onSObjectClick }: Props) {
    // ルールをクローンしてコンテキストとして使用する
    const rules = GROUPING_RULES.map(r => Object.assign({ objects: [] }, r));
    // グルーピング
    rules.sort((rule1, rule2) => rule2.judgeOrder - rule1.judgeOrder);
    sobjects.forEach((o) => {
        rules.some(r => {
            if (r.match(o)) {
                r.objects.push(o);
                return true;
            }
        });
    });
    // 並べ替え
    rules.sort((rule1, rule2) => rule2.order - rule1.order);
    // グループごとのTR生成
    const rows = rules.reduce((allRows, { title, objects }) => {
        const titleRow = <tr style="background:#EEECD1;"><th colSpan={COLUMNS_PER_ROW}>{title}</th></tr>;
        allRows.push(titleRow);
        const cells = objects.map(o => {
            return <td style="border: 1px dotted #CCC;">
                <a href="javascript:void 0;" onClick={() => onSObjectClick(o)}>{o.label}</a>
            </td>;
        });
        chunk(cells, COLUMNS_PER_ROW).forEach(cells => {
            allRows.push(<tr>{cells}</tr>);
        });
        return allRows;
    }, []);
    return <Table wrap={true}>{rows}</Table>;
}
