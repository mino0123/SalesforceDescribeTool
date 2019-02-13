export class Connection {
    baseUrl: string;
    token: string;
    constructor() {
        this.baseUrl = `/services/data/v45.0/`;
    }
    async root() {
        return this.request(``);
    }
    async sobjects() {
        return this.request(`sobjects`);
    }
    async describeSObject(name: string) {
        return this.request(`sobjects/${name}/describe`);
    }
    async request(url) {
        const method = 'GET';
        const res = await fetch(`${this.baseUrl}${url}`, {
            method,
            headers: new Headers({
                Authorization: 'OAuth ' + this.token,
                // 'X-PrettyPrint': 'true',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        });
        return res.json();
    }
}
