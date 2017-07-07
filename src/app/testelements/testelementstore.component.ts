import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../app.global';
import { AlertService, TestElementService } from '../_services/index';
import { ElementStore, Errors } from '../_models/index';
declare var $;
declare var Materialize:any;
@Component({
  moduleId: 'TESTELEMENTSTORE',
  templateUrl: './testelementstore.component.html'
})
export class TestElementStoreComponent implements OnInit {
    loading = false;
    formModel: any = {};
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
        private testElementService: TestElementService,
        private errors: Errors) { }

    ngOnInit() {
        $('.collapsible').collapsible();
        $('.modal').modal();
        if (this.global.validateLogin()){

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

        }
    }
}
