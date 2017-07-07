import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { Global } from './app.global';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ProjectService, 
  ApplicationService, TestElementService } from './_services/index';
import { Errors, User, Project, ProjectAccess, Application, ElementStore } from './_models/index';

import { RefreshComponent } from './_directives/index';
import { LoginComponent } from './login/index';
import { ProjectComponent } from './project/index';
import { ApplicationsComponent, UpdateApplicationsComponent } from './applications/index';
import { WorkspaceComponent } from './workspace/index';
import { TestElementsComponent, TestElementStoreComponent } from './testelements/index';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    RefreshComponent,
    LoginComponent,
    ProjectComponent,
    ApplicationsComponent,
    UpdateApplicationsComponent,
    WorkspaceComponent,
    TestElementsComponent,
    TestElementStoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterializeModule,
    ChartsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,
    Errors,
    User,
    ProjectService,
    Project,
    ProjectAccess,
    Application,
    ApplicationService,
    ElementStore,
    TestElementService,
    Global
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
