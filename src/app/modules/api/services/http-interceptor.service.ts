import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { isObject } from 'rxjs/internal-compatibility';
import { BLOG_API_CONFIG, BlogApiConfig } from '../types/api-config';
import { SessionService } from '@app/api/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private apiUrl: string | undefined;

  constructor(@Inject(BLOG_API_CONFIG) private config: BlogApiConfig,
              private sessionService: SessionService
  ) {
    this.apiUrl = config.apiUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const oldReq = req;
    req = req.clone({
      url: this.apiUrl + req.url
    });


    if (this.sessionService.getAccessToken()) {
      req = req.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.sessionService.getAccessToken(),
        }
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = (event as HttpResponse<any>).clone({
            body: event.body ? event.body.data : event.body
          });
        }

        return event;
      }),
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          if (err.statusText === 'Unauthorized' && oldReq.url !== 'user/me') {
            this.sessionService.setSessionExpired();
          }
          return throwError(this.handleErrorResponse(err));
        }

        return throwError(err);
      })
    );
  }


  private handleErrorResponse(err: any) {
    let errorData;

    if (isObject(err.error)) {
      return err.error;
    }

    try {
      const json = JSON.parse(err.error);
      if (json) {
        console.log(json);
        errorData = json;
      } else {
        errorData = err;
      }
    } catch (e) {
      errorData = err;
    }
    return errorData;
  }

}
