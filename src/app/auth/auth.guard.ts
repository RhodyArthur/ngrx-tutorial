import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "./reducers";
import { Router } from "@angular/router";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
                private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { 
        return this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                if(!loggedIn) {
                    this.router.navigateByUrl('/login')
                }
            })
        )
    }
}