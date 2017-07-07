import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Global } from "../app.global";
import 'rxjs/Rx';
import { Application } from "../_models/index";

@Injectable()
export class ApplicationService {

    constructor(private http: Http,
        private global: Global) { 
            
    }
    
    getAllApplications() {
        return this.http.get(this.global.getApplicationAPIPath(), this.jwt()).map((response: Response) => response.json());
    }

    getApplicationTypes(){
        return this.http.get(this.global.getApplicationAPIPath() + "types", this.jwt()).map((response: Response) => response.json());
    }

    addApplication(application: Application){
        return this.http.post(this.global.getApplicationAPIPath() + "add", JSON.stringify(application), this.jwt()).map((response: Response) => response.json());
    }

    updateApplication(application: Application){
      return this.http.post(this.global.getApplicationAPIPath() + "update", JSON.stringify(application), this.jwt()).map((response: Response) => response.json());
    }

    deleteApplication(id: number){
      return this.http.delete(this.global.getApplicationAPIPath() + id + "/delete", this.jwt()).map((response: Response) => response.json());
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