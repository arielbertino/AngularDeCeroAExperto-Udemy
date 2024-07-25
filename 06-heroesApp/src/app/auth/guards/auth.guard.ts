import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable <boolean> {
    return this.authService.checkAuthentication()
     .pipe(
        tap( isAthenticated => {
          if (! isAthenticated )
            this.router.navigate(['./auth/login']);
        }),
        tap( isAuthenticated => console.log('AuthGuard Authenticated: ', isAuthenticated)),
     );

  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean > | boolean {
    console.log('AuthGuard CanMatch works');
    // console.log({ route, segments });
    return this.checkAuthStatus();
    // return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('AuthGuard CanActivate works');
    // console.log({ route, state });
    return this.checkAuthStatus();
    // return true;
  }

}

// Forma NO deprecada, no dada en el curso
// const checkAuthStatus = (): boolean | Observable<boolean> => {
//   const authService: AuthService = Inject(AuthService);
//   const router: Router = Inject(Router);
//   return authService.checkAuthentication().pipe(
//     tap((isAuthenticated) => {
//       if (!isAuthenticated) {
//         router.navigate(['./auth/login']);
//       }
//     })
//   );
// };

// export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//    return checkAuthStatus();
// };

// export const canMatchGuard: CanMatchFn = (
//   route: Route,
//   segments: UrlSegment[]
// ) => {
//   return checkAuthStatus();
// };
// fin forma no deprecada
