import { ChildRelationship } from "./ChildRelationship";
import { DescribeFieldResult } from "./DescribeFieldResult";
import { RecordTypeInfo } from "./RecordTypeInfo";

export type DescribeSObjectResult = {
    name: string;
    label: string;
    keyprefix: string;
    custom: boolean;
    fields: DescribeFieldResult[];
    childRelationships: ChildRelationship[];
    recordTypeInfos: RecordTypeInfo[];
};
