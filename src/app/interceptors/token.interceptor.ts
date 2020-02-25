import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{


  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addTokenToHeadersIfExists(req);
    req = this.addContentTypeToHeadersIfMissing(req);
    req = this.addAcceptToHeaders(req);
    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === 401){
          this.router.navigate(['login'])
        }
        return throwError(error);
      }));

  }


  private addAcceptToHeaders(req: HttpRequest<any>) {
    req = req.clone({
      headers: req.headers.set('Accept', 'application/json')
    });
    return req;
  }

  private addContentTypeToHeadersIfMissing(req: HttpRequest<any>) {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      })
    }
    return req;
  }

  private addTokenToHeadersIfExists(req: HttpRequest<any>) {
    const token = localStorage.getItem(environment.tokenStorageName);
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return req;
  }
}
