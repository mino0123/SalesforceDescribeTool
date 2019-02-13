import { h } from "preact";

// オブジェクトの各詳細画面でテーブル戦闘に表示する「戻る」リンクの行
export function BackRow({ onBack, colSpan }: { onBack: () => void, colSpan: number }) {
    return <tr style="background:#EEECD1; font-size: 80%;"><td colSpan={colSpan}><a href="javascript:void 0;" onClick={onBack}>Back</a></td></tr>;
}
