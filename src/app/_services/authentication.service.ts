import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Global } from "../app.global";
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,
        private global: Global) { }

    login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.logout();
        return this.http.post(this.global.getUsersAPIPath() + 'authenticate', JSON.stringify({ username: username, password: password }), options)
            .map((response: Response) => {
                return response;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('selectedApplication');
        localStorage.removeItem('selectedProject');
        localStorage.removeItem('projectAccess');
        localStorage.removeItem('currentUser');
    }
}