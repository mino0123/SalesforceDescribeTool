import { h } from "preact";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";
import { TitleRow } from "./styled/TitleRow";

export function SObjectTitleRow({ object, colSpan }: { object: DescribeSObjectResult, colSpan: number }) {
    return <TitleRow colSpan={colSpan}>{object.label} : {object.name}</TitleRow>
}
