import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class BasicInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let ok: string;
    let secureReq: any = req.clone({
      headers: req.headers.set("Authorization", localStorage.getItem("token")), //设置请求头
      url: req.url.slice(0, 4) == "/api" ? "http://rsd.ganghang.sbnet.xyz" + req.url.slice(4) : req.url
    })
    console.log(secureReq);
    return next.handle(secureReq).pipe(
      tap(
        event => ok = event instanceof HttpResponse ? "succeeded" : "",
        error => {
          console.log(error);
          ok = "failed";
          if (error.url == "http://rsd.ganghang.sbnet.xyz/oauth/token") {
            alert("用户名或密码错误");
          }
          location.href = "/";
        }
      ),
      finalize(() => {

      })
    );
  }
}