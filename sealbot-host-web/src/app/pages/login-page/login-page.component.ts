import { Component, OnInit } from '@angular/core';
import { HostWebApis, TwitchLoginAuthorizePageUrlViewModel } from 'src/app/core/services/http/host-webapi.content';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CookieService } from 'ngx-cookie-service';
import { cookieKey } from 'src/app/core/enum/cookie';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  ifShowPage: boolean = false;
  twitchAuthorizePageUrl = {} as TwitchLoginAuthorizePageUrlViewModel;

  constructor(
    private http: HttpService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.setupAuthorizePageUrlAndState();
  }

  setupAuthorizePageUrlAndState() {
    this.http.get({url: HostWebApis.TwitchLoginAuthorizePageUrl}).subscribe(
      res => {
        this.twitchAuthorizePageUrl = res.body;
        let oauthOpaqueValue = new URL(this.twitchAuthorizePageUrl.url).searchParams.get('state');
        if (oauthOpaqueValue !== null){
          this.cookie.set(cookieKey.oauthState, oauthOpaqueValue);
        }
        this.ifShowPage = true;
      }
    )
  }
}
