import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../app.global';
import { AlertService, ApplicationService, TestElementService } from '../_services/index';
import { Application, ElementStore, Errors } from '../_models/index';
declare var $;
declare var Materialize:any;
@Component({
  moduleId: 'TESTELEMENTS',
  templateUrl: './testelements.component.html'
})
export class TestElementsComponent implements OnInit {
    loading = false;
    formModel: any = {};
    applications: Array<Application> = [];
    elementStores: Array<ElementStore> = [];
    elementIndex: number = -1;
    errorMessage: string = "";
    showNoDataError: boolean = false;
    serviceError: boolean = false;
    modalTitle:string="";
    newStore:boolean;
    storeId: number;
    storeName : string;
    
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private alertService: AlertService,
        private applicationService: ApplicationService,
        private testElementService: TestElementService,
        private errors: Errors) { }

    ngOnInit() {
        $('.collapsible').collapsible();
        $('.modal').modal();
        if (this.global.validateLogin()){
            this.global.clearLocalStorage('selectedApplication');
            this.loadApplications();
        }
    }

    ngDoCheck(){
        if (this.global.validateLogin()){
            if(this.global.hasError())
                this.alertService.error(this.global.getError());
        }
    }  

    refresh(){
        this.global.clearLocalStorage('selectedApplication');
        if (this.global.validateLogin()){
            this.onChange();
        }
    }

    loadApplications(){
        $('#alert').fadeOut(300, function() { $('#alert').hide(); });
        this.showNoDataError = false;
        this.applicationService.getAllApplications()
        .subscribe(
            data => {
                this.loading = false;
                this.applications = data.body;
                if (this.applications.length==0)
                    this.showNoDataError = true;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    onChange(){
        localStorage.setItem('selectedApplication', JSON.stringify(this.formModel.application));
        $('#alert').fadeOut(300, function() { 
            $(this).hide(); 
        });
        this.testElementService.getStores()
        .subscribe(
            data => {
                this.loading = false;
                this.elementStores = data.body;
                this.serviceError = false;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
                this.serviceError = true;
            }
        );
    }

    addStore(){
        this.modalTitle = "New Element Store";
        this.newStore=true;
        this.formModel.name = "";
        this.formModel.description = "";
        $('#addeditelementstore').modal('open');
        Materialize.updateTextFields();
    }

    editStore(elementStore: ElementStore){
        this.modalTitle = "Edit Element Store";
        this.newStore=false;
        this.formModel.name = elementStore.name;
        this.formModel.description = elementStore.description;
        this.storeId = elementStore.id;
        $('#addeditelementstore').modal('open');
        Materialize.updateTextFields();
    }

    saveStore(){
        if (this.global.validateLogin()){
            this.errorMessage = "";
            var elementStore: ElementStore = new ElementStore();
            elementStore.id = this.storeId;
            elementStore.name = this.formModel.name;
            elementStore.description = this.formModel.description;
            if(!this.formModel.name || elementStore.name.trim()===""){
                this.elementIndex=0;
                this.errorMessage = 'Please enter a valid name for the element store';
            }
            else if(!this.formModel.description || elementStore.description.trim()===""){
                this.elementIndex=1;
                this.errorMessage = 'Please enter a valid description';
            }
            else if(elementStore.name.length > 80){
                this.elementIndex=0;
                this.errorMessage = 'Element store name should not exceed 80 characters';
            }
            else if(elementStore.description.length > 120){
                this.elementIndex=1;
                this.errorMessage = 'Description should not exceed 120 characters';
            }
            else{
                this.clearForm();
                if (this.newStore){
                    this.testElementService.addStore(elementStore)
                    .subscribe(
                        data => {
                            this.loading = false;
                            this.alertService.success(data.body);
                            this.onChange();
                        },
                        error => {
                            this.loading = false;
                            this.alertService.error(this.global.getResponseError(error));
                        }
                    );
                }
                else{
                    this.testElementService.updateStore(elementStore)
                    .subscribe(
                        data => {
                            this.loading = false;
                            this.alertService.success(data.body);
                            this.onChange();
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

    openStore(elementStore: ElementStore){
        if (this.global.validateLogin()){
            localStorage.setItem('selectedElementStore', JSON.stringify(elementStore));
            this.global.navigate('testelements/store');
        }
    }

    clearForm(){
        this.formModel.name = "";
        this.formModel.description = "";
        this.elementIndex = -1;
        this.errorMessage = "";
        $('#addeditelementstore').modal('close');
    }

    deleteStoreConfirmation(elementStore: ElementStore){
        this.storeName  = elementStore.name;
        this.storeId = elementStore.id;
        $('#deleteconfirmation').modal('open');
    }

    deleteStore(){
        if (this.global.validateLogin()){
            this.testElementService.deleteStore(this.storeId)
            .subscribe(
                data => {
                    this.alertService.success(data.body);
                    this.onChange();
                },
                error => {
                    this.alertService.error(this.global.getResponseError(error));
                }
            );
        }
    }
}
