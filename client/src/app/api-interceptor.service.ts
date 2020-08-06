import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';

import { ApiService } from './api.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private apiService: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.apiService.userToken.pipe(
      take(1),
      exhaustMap((token) => {
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
