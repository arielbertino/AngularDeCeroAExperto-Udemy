import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('PublicGuard Authenticated: ', isAuthenticated)),
        tap( isAuthenticated => {
          if ( isAuthenticated ) {
            this.router.navigate(['/'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('PublicGuard CanMatch works');

    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    console.log('PublicGuard CanMatch works');

    return this.checkAuthStatus();
  }
}
