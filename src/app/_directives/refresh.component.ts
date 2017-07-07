import { Component, Input } from '@angular/core';
import { Global } from '../app.global';

@Component({
    moduleId: 'refresh',
    templateUrl: './refresh.component.html'
})

export class RefreshComponent {

    constructor(global: Global) { 
        if (localStorage.getItem('returnURL'))
            global.navigate(localStorage.getItem('returnURL'));
        else
            global.navigate('');
    }
}