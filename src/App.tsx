import { Component, h, render } from "preact";
import { Icon } from "./components/styled/Icon";
import { ModalPanel } from "./components/styled/ModalPanel";
import { ObjectInfoChildRelationsTable } from "./components/ObjectInfoChildRelationsTable";
import { ObjectInfoFieldTable } from "./components/ObjectInfoFieldTable";
import { ObjectInfoOthersTable } from "./components/ObjectInfoOthersTable";
import { ObjectInfoRecordTypesTable } from "./components/ObjectInfoRecordTypesTable";
import { ObjectInfoMode, ObjectInfoSideMenu } from "./components/ObjectInfoSideMenu";
import { SObjectTable } from "./components/SObjectTable";
import { Connection } from "./Connection";
import { DescribeSObjectResult } from "./types/DescribeSObjectResult";
import { ViewMode } from "./ViewMode";

type AppState = {
    sobjects: [DescribeSObjectResult],
    viewMode: ViewMode,
    currentObject: DescribeSObjectResult,
    currentObjectDetail: string
};

export class App extends Component {

    conn: Connection;

    constructor() {
        super();

        this.state = {
            sobjects: null,
            viewMode: ViewMode.None
        };
        this.conn = new Connection();
        this.conn.token = document.cookie.split('sid=')[1].split(';')[0];

        this.handleIconClick = this.handleIconClick.bind(this);
        this.clear = this.clear.bind(this);
        this.handleObjectNameClick = this.handleObjectNameClick.bind(this);
        this.handleObjectMenuClick = this.handleObjectMenuClick.bind(this);
    }

    async handleIconClick() {
        const gd = await this.conn.sobjects();
        this.setState({ sobjects: gd.sobjects, viewMode: ViewMode.ObjectList });
    }

    async handleObjectNameClick(sobject: DescribeSObjectResult) {
        const result = await this.conn.describeSObject(sobject.name);
        this.setState({ viewMode: ViewMode.ObjectInfo_Fields, currentObject: result, currentObjectDetail: ObjectInfoMode.Fields });
    }

    clear(evt: MouseEvent): void {
        this.setState({ viewMode: ViewMode.None });
    }

    handleObjectMenuClick(selected: string) {
        this.setState({ currentObjectDetail: selected });
        ({
            [ObjectInfoMode.Fields]:         () => this.setState({ viewMode: ViewMode.ObjectInfo_Fields }),
            [ObjectInfoMode.ChildRelations]: () => this.setState({ viewMode: ViewMode.ObjectInfo_ChildRelations }),
            [ObjectInfoMode.RecordTypes]:    () => this.setState({ viewMode: ViewMode.ObjectInfo_RecordTypes }),
            [ObjectInfoMode.Others]:         () => this.setState({ viewMode: ViewMode.ObjectInfo_Others })
        })[selected]();
    }

    render({}, { sobjects, viewMode, currentObject, currentObjectDetail }: AppState) {
        switch (viewMode) {
            case ViewMode.None:
                return <Icon onClick={this.handleIconClick} />;
            case ViewMode.ObjectList:
                return <ModalPanel onModalClick={this.clear}>
                        <SObjectTable sobjects={sobjects} onSObjectClick={this.handleObjectNameClick} />
                    </ModalPanel>
            case ViewMode.ObjectInfo_Fields:
                return <ModalPanel onModalClick={this.clear}>
                        <ObjectInfoSideMenu selected={currentObjectDetail} onClick={this.handleObjectMenuClick} />
                        <ObjectInfoFieldTable object={currentObject} onBack={this.handleIconClick} />
                    </ModalPanel>
            case ViewMode.ObjectInfo_ChildRelations:
                return <ModalPanel onModalClick={this.clear}>
                        <ObjectInfoSideMenu selected={currentObjectDetail} onClick={this.handleObjectMenuClick} />
                        <ObjectInfoChildRelationsTable object={currentObject} onBack={this.handleIconClick} />
                    </ModalPanel>
            case ViewMode.ObjectInfo_RecordTypes:
                return <ModalPanel onModalClick={this.clear}>
                        <ObjectInfoSideMenu selected={currentObjectDetail} onClick={this.handleObjectMenuClick} />
                        <ObjectInfoRecordTypesTable object={currentObject} onBack={this.handleIconClick} />
                    </ModalPanel>
            case ViewMode.ObjectInfo_Others:
                return <ModalPanel onModalClick={this.clear}>
                        <ObjectInfoSideMenu selected={currentObjectDetail} onClick={this.handleObjectMenuClick} />
                        <ObjectInfoOthersTable object={currentObject} onBack={this.handleIconClick} />
                    </ModalPanel>
        }
        return <ModalPanel onModalClick={this.clear}>
                <ObjectInfoSideMenu selected={currentObjectDetail} onClick={this.handleObjectMenuClick} />
            </ModalPanel>
    }

    static watchAndRenderApplication() {
        if (document && document.body) {
            render(<App />, document.body);
        } else {
            setTimeout(this.watchAndRenderApplication, 2000);
        }
    }
};
