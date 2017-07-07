import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Global } from '../app.global';
import { AlertService, AuthenticationService } from '../_services/index';
declare var $;

@Component({
    moduleId: 'LOGIN',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    elementIndex = -1;
    errorMessage = '';
    returnUrl: string;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    ngDoCheck(){
        if (this.global.hasError()){
            this.alertService.error(this.global.getError());
        }
    }

    login() {
        this.global.clearError();
        this.errorMessage = "";
        if(!this.model.username){
            this.elementIndex=0;
            this.errorMessage = 'Please enter a valid user name';
        }
        else if(!this.model.password){
            this.elementIndex=1;
            this.errorMessage = 'Please enter a valid password';
        }
        else if(this.model.password.length < 8){
            this.elementIndex=1;
            this.errorMessage = 'Password should be at least 8 character length';
        }
        else{
            this.elementIndex=-1;
            this.loading = true;
            this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.loading = false;
                    let user = data.json().body;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigate(['']);
                },
                error => {
                    this.loading = false;
                    if(error.status==0)
                        this.errorMessage = "Unable to process your request. Please retry after sometime.";
                    else if(error.status==401)
                        this.errorMessage = "Authentication failed! Please verify your user name and password";
                    else if(error.status==403)
                        this.errorMessage = error.statusText;
                    else if(error.status==404)
                        this.errorMessage = "Requested URL is not available. Please try after sometime.";
                    else
                        this.errorMessage = error.status+": "+error.json().body;
                    this.alertService.error(this.errorMessage);
                    console.log(error);
                }
            );
        }
    }
}
