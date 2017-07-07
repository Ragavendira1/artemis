import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Global } from "../app.global";
import 'rxjs/Rx';

import { Project } from '../_models/index';

@Injectable()
export class ProjectService {
    constructor(private http: Http,
        private global: Global) { }

    getPublicProjects() {
        return this.http.get(this.global.getProjectsAPIPath() + "public", this.jwt()).map((response: Response) => response.json());
    }

    getPrivateProjects() {
        return this.http.get(this.global.getProjectsAPIPath() + "private", this.jwt()).map((response: Response) => response.json());
    }

    addProject(project: Project){
        return this.http.post(this.global.getProjectsAPIPath() + "add", JSON.stringify(project), this.jwt()).map((response: Response) => response.json());
    }

    updateProject(project: Project){
      return this.http.post(this.global.getProjectsAPIPath() + "update", JSON.stringify(project), this.jwt()).map((response: Response) => response.json());
    }

    deleteProject(id: number){
      return this.http.delete(this.global.getProjectsAPIPath() + id + "/delete", this.jwt()).map((response: Response) => response.json());
    }

    getProjectMembers(id: number){
      return this.http.get(this.global.getProjectsAPIPath() + id + "/members", this.jwt()).map((response: Response) => response.json());
    }

    getAccessInformation(id: number){
        return this.http.get(this.global.getProjectsAPIPath() + id + "/access", this.jwt()).map((response: Response) => response.json());
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