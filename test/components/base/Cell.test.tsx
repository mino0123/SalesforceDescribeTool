import { h } from "preact";
import { Cell } from "../../../src/components/styled/Cell";
import expect = require("expect");


describe('components/styled/Cell', () => {
    it('should show table cell', () => {
        expect(<Cell><a href="">link</a></Cell>).toContain(<a href="">link</a>);
    });
});
