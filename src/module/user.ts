export class User {

    username: string;
    name: string;
    firstname: string
    email: string
    token: string;
    refreshToken: string

    constructor(arg: { username: string, name: string, firstname: string, email: string, token: string, refreshToken: string }) {
        this.username = arg.username;
        this.name = arg.name;
        this.firstname = arg.firstname;
        this.email = arg.email;
        this.token = arg.token;
        this.refreshToken = arg.refreshToken;
    }

}