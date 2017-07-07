import { Component, OnInit } from '@angular/core';
import { Global } from '../app.global';
import { AlertService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
    moduleId: 'ALERT',
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any = null;

    constructor(private alertService: AlertService,
    private global: Global,
    private route: ActivatedRoute) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
            $('#alert').show();
        });
    }

    closeAlert(){
        this.global.clearError();
        this.global.clearSuccess();
        $('#alert').fadeOut(300, function() { 
            $(this).hide(); 
        });
    }
}