import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatSidenavModule, MatListModule } from '@angular/material';

import { UserBoxComponent } from './controls/user-box/user-box.component';
import { SideContainerComponent } from './controls/side-container/side-container.component';

import { DataService } from './services/data.service';
import { AccountService } from './services/account.service';
import { SideBarConfigurationService } from './services/side-bar-configuration.service';
import { AuthGuardService } from './guards/auth.guard';

import * as firebase from 'firebase';

// Initialize Firebase App
firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        UserBoxComponent,
        SideContainerComponent,
    ],
    exports: [
        UserBoxComponent,
        SideContainerComponent,
    ],
    imports: [
        BrowserModule,

        RouterModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,

        MatSidenavModule,
        MatListModule,
    ],
    providers: [
        DataService,
        AccountService,
        SideBarConfigurationService,
        AuthGuardService,
    ],

})
export class CommonModule { }
