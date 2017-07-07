import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from './app.global';
import { User } from './_models/index';
//declare var Materialize:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private global: Global,
    private cdr: ChangeDetectorRef) {  }

  ngDoCheck(){
    this.cdr.detectChanges();
  }
}
