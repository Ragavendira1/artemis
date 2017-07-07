import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Global } from '../app.global';
import { AlertService, ProjectService } from '../_services/index';
import { Errors, Project, ProjectAccess } from '../_models/index';
declare var $;

@Component({
  moduleId: 'WORKSPACE',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements OnInit {
  project: Project;
  projectAccess: ProjectAccess;
  projectAccessList: Array<ProjectAccess>;
  loading = false;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private global: Global,
        private projectService: ProjectService,
        private alertService: AlertService,
        private errors: Errors) { }

    ngOnInit() {
        $('.collapsible').collapsible();
        $('.modal').modal();
        if (this.global.validateLogin()){
            this.global.clearLocalStorage('selectedApplication');
            if (this.global.getSelectedProject()){
                this.project = this.global.getSelectedProject();
                this.getProjectAccess();
                this.getProjectMembers();
            }
            else{
                this.global.setError(this.errors.E00010);
                this.global.navigate('');
            }
        }
    }

    ngDoCheck(){
        if (this.global.validateLogin()){
            if(this.global.hasError())
                this.alertService.error(this.global.getError());
        }
    }

    getProjectAccess(){
        this.projectService.getAccessInformation(this.project.id)
        .subscribe(
            data => {
                this.loading = false;
                this.projectAccess = data.body;
                localStorage.setItem('projectAccess', JSON.stringify(this.projectAccess));
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

    getProjectMembers(){
        this.projectService.getProjectMembers(this.project.id)
        .subscribe(
            data => {
                this.loading = false;
                this.projectAccessList = data.body;
            },
            error => {
                this.loading = false;
                this.alertService.error(this.global.getResponseError(error));
            }
        );
    }

 
    // Doughnut
    public doughnutChartLabels:string[] = ['Application One', 'Application Two', 'Application Three'];
    public doughnutChartData:number[] = [350, 450, 100];
    //public doughnutChartColors:string[] = ['#A9D0F5', '#A9F5A9', '#F2F5A9'];
    public doughnutChartColors: any[] = [
        {backgroundColor: [
                "#A9D0F5",
                "#A9F5A9",
                "#F2F5A9"
            ]}];

    // lineChart
  public lineChartData:Array<any> = [
    {data: [new Date().getSeconds(), 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, new Date().getSeconds(), 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, new Date().getSeconds(), 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(169,208,245,0.2)',
      borderColor: 'rgba(169,208,245,1)',
      pointBackgroundColor: 'rgba(169,208,245,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(169,208,245,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(169,245,169,0.2)',
      borderColor: 'rgba(169,245,169,1)',
      pointBackgroundColor: 'rgba(169,245,169,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(169,245,169,1)'
    },
    { // grey
      backgroundColor: 'rgba(255,203,96,0.2)',
      borderColor: 'rgba(255,203,96,1)',
      pointBackgroundColor: 'rgba(255,203,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,203,96,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
    // events
    public chartClicked(e:any):void {
    console.log(e);
    }

    public chartHovered(e:any):void {
    console.log(e);
    }
  
}
