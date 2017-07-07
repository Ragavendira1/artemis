import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Global } from '../app.global';
import { AlertService, ApplicationService } from '../_services/index';
import { Errors, Application } from '../_models/index';
declare var $;

@Component({
    moduleId: 'UPDATE_APPLICATIONS',
    templateUrl: 'updateapplications.component.html'
})

export class UpdateApplicationsComponent implements OnInit {
    formModel: any = {};
    loading = false;
    elementIndex = -1;
    errorMessage = '';
    mode: string;
    title: string = "Add New Application";
    types : Array<string> = [];
    selectedApplication: Application

     constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private applicationService: ApplicationService,
        private alertService: AlertService,
        private errors: Errors) { 
            this.route.params.subscribe(params => {
                this.mode = params.mode;
                if (this.mode=="add")
                    this.title = "Add New Application";
                else{
                    this.selectedApplication = JSON.parse(localStorage.getItem('selectedApplication'));
                    this.title = "Edit Application";
                    this.formModel.name = this.selectedApplication.name;
                    this.formModel.type = this.selectedApplication.type;
                    this.formModel.description = this.selectedApplication.description;
                    this.formModel.technology = this.selectedApplication.technology;
                }
            }); 
        }

    ngOnInit() {
        $('.modal').modal();
        $('select').material_select();
        if(this.global.validateLogin()){
            this.getApplicationTypes();
        }
        $('#alert').fadeOut(300, function() { $('#alert').hide(); });
    }

    ngDoCheck(){
        if (this.global.validateLogin()){
            if(this.global.hasError())
                this.alertService.error(this.global.getError());
        }
    }

    getApplicationTypes(){
        this.applicationService.getApplicationTypes()
        .subscribe(
            data => {
                this.loading = false;
                this.types = data.body;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    saveApplication(){
        if(this.formModel.name==null)
            this.alertService.error("Please enter an application name");
        else if(this.formModel.type==null)
            this.alertService.error("Please select an application type");
        else if(this.formModel.description==null)
            this.alertService.error("Please provide a short description about this application");
        else if(this.formModel.technology==null)
            this.alertService.error("Please mention the technologies used for developing this application");
        else{
            let application: Application = new Application();
            application.name = this.formModel.name;
            application.type = this.formModel.type;
            application.description = this.formModel.description;
            application.technology = this.formModel.technology;
            application.projectid = this.global.getSelectedProject().id;
            if (this.mode=="add"){
                this.applicationService.addApplication(application)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.global.setSuccess(data.body);
                        this.global.navigate("applications", true);
                    },
                    error => {
                        this.loading = false;
                        this.alertService.error(this.global.getResponseError(error));
                    }
                );
            }
            else{
                application.id = this.global.getSelectedApplication().id;
                this.applicationService.updateApplication(application)
                .subscribe(
                    data => {
                        this.loading = false;
                        this.global.setSuccess(data.body);
                        this.global.navigate("applications", true);
                    },
                    error => {
                        this.loading = false;
                        this.alertService.error(this.global.getResponseError(error));
                    }
                );
            }
        }
    }
}