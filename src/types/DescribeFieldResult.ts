export type DescribeFieldResult = {
    name: string;
    label: string;
    type: string;
    referenceTo: string[];
    picklistValues: [{ value }]
}