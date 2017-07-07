import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Global } from "../app.global";
import 'rxjs/Rx';

@Injectable()
export class UserService {
    constructor(private http: Http,
        private global: Global) { }

    getByUsername(username: string) {
        return this.http.get(this.global.getUsersAPIPath() + username, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Basic ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}