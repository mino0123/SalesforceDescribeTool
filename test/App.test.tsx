import { h } from "preact";
import { App } from "../src/App";
import { Icon } from "../src/components/styled/Icon";

describe('App', () => {
    it('show icon', () => {
        const app = <App />;
        
        expect(app).toContain(<App />);
    });
});