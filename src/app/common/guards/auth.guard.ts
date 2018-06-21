import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private accountService: AccountService,
        public router: Router) {
    }

    canActivate(): Observable<boolean> | boolean {
        console.log('AuthGuard called');

        return this.accountService.user$.pipe(
            map(user => {
                if (!user) {
                    this.router.navigateByUrl('');
                    console.log('not authenticated');
                    return false;
                }
                return true;
            })
        );
    }
}
