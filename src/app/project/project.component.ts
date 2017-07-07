import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Global } from '../app.global';
import { AlertService, ProjectService } from '../_services/index';
import { Errors, Project } from '../_models/index';
declare var $;
declare var Materialize:any;
@Component({
    moduleId: 'PROJECT',
    templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit {
    formModel: any = {};
    loading = false;
    elementIndex = -1;
    errorMessage = '';
    publicProjects : Array<Project> = [];
    privateProjects : Array<Project> = [];
    isPublic: boolean = true;
    newProject:boolean;
    modalTitle:string="";
    projectId: number;
    projectName : string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private projectService: ProjectService,
        private alertService: AlertService,
        private errors: Errors) { 
        }

    ngOnInit() {
        if(this.global.validateLogin()){
            this.global.clearLocalStorage('selectedApplication');
            this.global.clearLocalStorage('projectAccess');
            this.global.clearLocalStorage('selectedProject');
            this.loadProjects();
        }
        $('.modal').modal();
    }

    ngDoCheck(){
        if (this.global.validateLogin()){
            if(this.global.hasError())
                this.alertService.error(this.global.getError());
        }
    }

    loadProjects(){
        $('#alert').fadeOut(300, function() { $('#alert').hide(); });
        this.getPublicProjects();
        this.getPrivateProjects();
    }

    getPublicProjects(){
        this.projectService.getPublicProjects()
        .subscribe(
            data => {
                this.loading = false;
                this.publicProjects = data.body;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    getPrivateProjects(){
        this.projectService.getPrivateProjects()
        .subscribe(
            data => {
                this.loading = false;
                this.privateProjects = data.body;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    getLength(projectarray: Array<Project>){
        if(projectarray)
            return projectarray.length;
        else
            return 0;
    }

    openProject(project: Project){
        if (this.global.validateLogin()){
            localStorage.setItem('selectedProject', JSON.stringify(project));
            this.global.navigate('workspace');
        }
    }

    addProject(){
        this.newProject=true;
        this.formModel.name = "";
        this.formModel.description = "";
        this.modalTitle = "Add New Project";
        $('#addeditproject').modal('open');
    }

    editProject(project: Project){
        this.newProject=false;
        this.modalTitle = "Edit Project";
        this.formModel.name = project.name;
        this.formModel.description = project.description;
        this.projectId = project.id;
        $('#addeditproject').modal('open');
        Materialize.updateTextFields();
    }

    deleteProjectConfirmation(project: Project){
        this.projectName  = project.name;
        this.projectId = project.id;
        $('#deleteconfirmation').modal('open');
    }

    deleteProject(){
        if (this.global.validateLogin()){
            this.projectService.deleteProject(this.projectId)
            .subscribe(
                data => {
                    this.alertService.success(data.body);
                    this.getPrivateProjects();
                },
                error => {
                    this.alertService.error(this.global.getResponseError(error));
                }
            );
        }
    }

    saveProject(){
        if (this.global.validateLogin()){
            this.errorMessage = "";
            var project: Project = new Project();
            project.id = this.projectId;
            project.name = this.formModel.name;
            project.description = this.formModel.description;
            project.ispublic = false;
            if(!this.formModel.name || project.name.trim()===""){
                this.elementIndex=0;
                this.errorMessage = 'Please enter a valid project name';
            }
            else if(!this.formModel.description || project.description.trim()===""){
                this.elementIndex=1;
                this.errorMessage = 'Please enter a valid description';
            }
            else if(project.name.length > 80){
                this.elementIndex=0;
                this.errorMessage = 'Project name should not exceed 80 characters';
            }
            else if(project.description.length > 120){
                this.elementIndex=1;
                this.errorMessage = 'Description should not exceed 120 characters';
            }
            else{
                this.clearForm();
                if (this.newProject){
                    this.projectService.addProject(project)
                    .subscribe(
                        data => {
                            this.alertService.success(data.body);
                            this.getPrivateProjects();
                        },
                        error => {
                            this.alertService.error(this.global.getResponseError(error));
                        }
                    );
                }
                else{
                    this.projectService.updateProject(project)
                    .subscribe(
                        data => {
                            this.alertService.success(data.body);
                            this.getPrivateProjects();
                        },
                        error => {
                            this.alertService.error(this.global.getResponseError(error));
                        }
                    );
                }
            }
        }
    }

    clearForm(){
        this.formModel.name = "";
        this.formModel.description = "";
        $('#addeditproject').modal('close');
    }
}
