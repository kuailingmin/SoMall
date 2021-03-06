import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthQuery } from 'src/store/auth/auth.query';
import { AuthService } from 'src/store/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private authQuery: AuthQuery
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return new Promise((resolve, reject) => {
            this.authService.userLoaded$.subscribe(res => {
                if (res)
                    resolve(true);
                else {
                    resolve(false);
                    this.authService.startAuthentication();
                }
            });
        });
    }
}


// canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.authQuery.selectLoading().pipe(
//         skipWhile(loading => loading),
//         switchMap(() => this.authQuery.isLoggedIn$),
//         map(isLoggedIn => {
//             if (!isLoggedIn) {
//                 this._router.navigate(['/']);
//             }
//             return isLoggedIn;
//         }),
//         take(1)
//     );
// }