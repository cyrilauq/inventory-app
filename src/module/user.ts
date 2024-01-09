export class User {

    username: string;
    name: string;
    firstname: string;
    email: string;
    token: string;
    refreshToken: string;
    accessToken: string;

    constructor(arg: { username: string, name: string, firstname: string, email: string, token: string, accessToken: string, refreshToken: string }) {
        this.username = arg.username;
        this.name = arg.name;
        this.firstname = arg.firstname;
        this.email = arg.email;
        this.token = arg.token;
        this.refreshToken = arg.refreshToken;
        this.accessToken = arg.accessToken;
    }

}