import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import {Errors, User, Project, ProjectAccess, Application, ElementStore} from './_models/index';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;

@Injectable()
export class Global {
    public title = 'SQS ARTEMIS';
    public version = "1.0.alpha";
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private errors: Errors) { }

    //COMMON FUNCTIONS

    refresh(returnURL:string){
        localStorage.setItem('returnURL', returnURL);
        this.navigate('refresh');
    }

    navigate(url:string, keepAlert?: boolean){
        if(!keepAlert){
            this.clearError();
            this.clearSuccess();
        }
        return this.router.navigate([url]);
    }

    navigateEx(url:string, message: any){
        this.router.navigate([url], { queryParams: { error : message }});
    }

    setError(errormessage: string){
        localStorage.setItem('error', errormessage);
    }

    hasError(){
        if (localStorage.getItem('error'))
            return true;
        else
            return false;
    }

    getError(){
        return localStorage.getItem('error');
    }

    clearError(){
        localStorage.removeItem('error');
    }

    setSuccess(successmessage: string){
        localStorage.setItem('success', successmessage);
    }

    hasSuccess(){
        if (localStorage.getItem('success'))
            return true;
        else
            return false;
    }

    getSuccess(){
        return localStorage.getItem('success');
    }

    clearSuccess(){
        localStorage.removeItem('success');
    }

    getResponseError(error: any){
        let errorMessage: string = "Unknown Error";
        if(error.status==0)
            errorMessage = "Unable to process your request. Please retry after sometime.";
        else if(error.status==400)
            errorMessage = error.json().body;
        else if(error.status==401)
            errorMessage = "Unauthorized access! Please sign in to access the application.";
        else if(error.status==403)
            errorMessage = error.statusText;
        else if(error.status==404)
            errorMessage = "API service is not available. Please try after sometime.";
        else
            errorMessage = error.status+": "+error._body + ";" + error.json().body;

        return errorMessage;
    }

    //USER FUNCTIONS

    getUsersAPIPath(){
        return "http://localhost:8090/artemisapi/users/";
    }

    isLoggedIn(){
        if (localStorage.getItem('currentUser'))
            return true;
        else{
            return false;
        }
    }

    validateLogin(){
        if (this.isLoggedIn()){
            return true;
        }
        else{
            this.setError(this.errors.E00002);
            this.navigate('login');
            return false;
        }
    }

    isAdmin(){
        if(this.isLoggedIn()){
            let user: User;
            user = JSON.parse(localStorage.getItem('currentUser'));
            return user.isadmin;
        }
        else{
            return false;
        }
    }

    getFullName(){
        let user: User;
        let fullname: string = "";
        if(this.isLoggedIn()){
            user = JSON.parse(localStorage.getItem('currentUser'));
            fullname = user.fullname;
        }
        return fullname;
    }

    //PROJECT FUNCTIONS

    getProjectsAPIPath(){
        return "http://localhost:8090/artemisapi/projects/";
    }

    isProjectSelected(){
        if (localStorage.getItem('selectedProject'))
            return true;
        else{
            return false;
        }
    }

    getSelectedProject(){
        if (localStorage.getItem('selectedProject'))
            return JSON.parse(localStorage.getItem('selectedProject'));
        else
            return null;
    }

    getProjectName(){
        if (localStorage.getItem('selectedProject')){
            let selectedProject: Project = JSON.parse(localStorage.getItem('selectedProject'));
            return selectedProject.name;
        }  
        else{
            return "";
        }
    }

    isProjectAdmin(){
        if (localStorage.getItem('projectAccess')){
           let projectAccess: ProjectAccess = JSON.parse(localStorage.getItem('projectAccess'));
            return projectAccess.isadmin;
        }  
        else{
            return false;
        }
    }

    clearLocalStorage(key:string){
        if (localStorage.getItem(key))
            localStorage.removeItem(key);
    }

    //APPLICATION FUNCTIONS

    getApplicationAPIPath(){
        return "http://localhost:8090/artemisapi/projects/"+this.getSelectedProject().id +"/applications/";
    }

    isApplicationSelected(){
        if (localStorage.getItem('selectedApplication'))
            return true;
        else{
            return false;
        }
    }

    getSelectedApplication(){
        if (localStorage.getItem('selectedApplication'))
            return JSON.parse(localStorage.getItem('selectedApplication'));
        else
            return null;
    }

    getApplicationName(){
        if (localStorage.getItem('selectedApplication')){
            let selectedApplication: Application = JSON.parse(localStorage.getItem('selectedApplication'));
            if (selectedApplication)
                return selectedApplication.name;
            else{
                return "";
            }
        }
        else{
            return "";
        }
    }

    // TEST ELEMENT STORE

    getElementStoreAPIPath(){
        return "http://localhost:8090/artemisapi/projects/"+this.getSelectedProject().id +
            "/applications/" + this.getSelectedApplication().id + "/elementstores/";
    }

    getSelectedElementStore(){
        if (localStorage.getItem('selectedElementStore'))
            return JSON.parse(localStorage.getItem('selectedElementStore'));
        else
            return null;
    }
}
