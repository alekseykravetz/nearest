import { User } from '@firebase/auth-types';
import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private accountService: AccountService,
        public router: Router) {
    }

    canActivate(): Observable<boolean> | boolean {
        console.log('AuthGuard called');
        return this.accountService.user$.map(user => {
            if (!user) {
                this.router.navigateByUrl('');
                console.log('not authenticated');
                return false;
            }
            return true;
        });
    }
}
