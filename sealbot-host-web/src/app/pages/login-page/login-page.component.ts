import { Component, OnInit } from '@angular/core';
import { HostWebApis, TwitchLoginAuthorizePageUrlResponse, AuthLoginParameter, AuthLoginResponse } from 'src/app/core/services/http/host-webapi.content';
import { HttpService } from 'src/app/core/services/http/http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  ifShowPage: boolean = false;
  twitchAuthorizePageUrl = {} as TwitchLoginAuthorizePageUrlResponse;

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
          this.cookie.set('_oauth_state', oauthOpaqueValue);
        }
        this.ifShowPage = true;
      }
    )
  }
}
