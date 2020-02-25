import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.hostAndPort+'/api/auth/';
  isLoggedIn : boolean = false;
  redirectUrl : string = "";
  constructor(private http : HttpClient) {

  }

  // tap -> is something like peek in Java stream, checks every emission in observable

  login(data : any) : Observable<any>{
    return this.http.post(this.apiUrl+'login',data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login',[]))
      )
  }

  storeToken(token) : void{
    localStorage.setItem(environment.tokenStorageName, token);
  }

  logout() : Observable<any>{
    return this.http.get(this.apiUrl+'logout')
      .pipe(
        tap(_ => this.isLoggedIn = false),
        catchError(this.handleError('logout',[]))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
