import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Global } from "../app.global";
import 'rxjs/Rx';

import { ElementStore } from '../_models/index';

@Injectable()
export class TestElementService {
    constructor(private http: Http,
        private global: Global) { }

    getStores() {
        return this.http.get(this.global.getElementStoreAPIPath(), this.jwt()).map((response: Response) => response.json());
    }

    addStore(elementStore: ElementStore){
        return this.http.post(this.global.getElementStoreAPIPath() + "add", JSON.stringify(elementStore), this.jwt()).map((response: Response) => response.json());
    }

    updateStore(elementStore: ElementStore){
      return this.http.post(this.global.getElementStoreAPIPath() + "update", JSON.stringify(elementStore), this.jwt()).map((response: Response) => response.json());
    }

    deleteStore(id: number){
      return this.http.delete(this.global.getElementStoreAPIPath() + id + "/delete", this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods   

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + currentUser.token);
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }
}