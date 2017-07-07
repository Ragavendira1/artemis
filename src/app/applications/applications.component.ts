import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Global } from '../app.global';
import { AlertService, ApplicationService } from '../_services/index';
import { Errors, Application } from '../_models/index';
declare var $;

@Component({
    moduleId: 'APPLICATIONS',
    templateUrl: 'applications.component.html'
})

export class ApplicationsComponent implements OnInit {
    model: any = {};
    loading = false;
    elementIndex = -1;
    errorMessage = '';
    applications : Array<Application> = [];
    newApplication:boolean;
    modalTitle:string="";
    applicationId: number;
    applicationName : string;

     constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private applicationService: ApplicationService,
        private alertService: AlertService,
        private errors: Errors) { }

    ngOnInit() {
        $('.modal').modal();
        if(this.global.validateLogin()){
            this.loadApplications();
        }
        $('#alert').fadeOut(300, function() { $('#alert').hide(); });
    }

    ngDoCheck(){
        if (this.global.validateLogin()){
            if(this.global.hasSuccess())
                this.alertService.success(this.global.getSuccess());
            else if(this.global.hasError())
                this.alertService.error(this.global.getError()); 
        }
    }

    refresh(){
        this.global.clearError();
        this.global.clearSuccess();
        $('#alert').fadeOut(300, function() { $('#alert').hide(); });
        this.loadApplications();
    }

    loadApplications(){
        this.applicationService.getAllApplications()
        .subscribe(
            data => {
                this.loading = false;
                this.applications = data.body;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    addApplication(){
        this.global.navigate("applications/add");
    }

    editApplication(application: Application){
        localStorage.setItem('selectedApplication', JSON.stringify(application));
        this.global.navigate("applications/edit")
    }

    deleteApplicationConfirmation(application: Application){
        this.applicationId = application.id;
        this.applicationName = application.name;
        $('#deleteconfirmation').modal('open');
    }

    deleteApplication(){
        this.global.clearError();
        this.global.clearSuccess();
        if (this.global.validateLogin()){
            this.applicationService.deleteApplication(this.applicationId)
            .subscribe(
                data => {
                    this.alertService.success(data.body);
                    this.loadApplications();
                },
                error => {
                    this.alertService.error(this.global.getResponseError(error));
                }
            );
        }
    }
}