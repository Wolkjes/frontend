import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import jwt_decode from 'jwt-decode'

@Injectable()
export class AuthAdminGuard implements CanActivate {
    token: any;
    decodedToken: any;

    constructor(private tokenService: TokenStorageService, private router: Router) {
        this.token = this.tokenService.getToken();
        this.decodedToken = jwt_decode(this.token);     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //a user or admin is logged in
        if (sessionStorage.getItem('auth-user')) {
            //role admin so return true
            if (this.decodedToken.role == 'admin'){
            return true;
            }
            //no admin so return false
            this.router.navigate(['/campus'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}