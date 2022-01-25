import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { cookieKey } from 'src/app/core/enum/cookie';
import { TwitchOauthCodeFlowGetCodeResponse } from 'src/app/core/services/http/twitch.content';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HostWebApis, TwitchLoginTokenParameter, TwitchLoginTokenViewModel } from 'src/app/core/services/http/host-webapi.content';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-twitch-login-page',
  templateUrl: './twitch-login-page.component.html',
  styleUrls: ['./twitch-login-page.component.scss']
})
export class TwitchLoginPageComponent implements OnInit {

  codeFlowReponse = {} as TwitchOauthCodeFlowGetCodeResponse

  constructor(
    private readonly activedRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly cookie: CookieService,
    private readonly httpService: HttpService
  ) { }

  ngOnInit(): void {
    // get response from twitch
    this.setCodeFlowResponseFromRoute();
    
    // verify oath state
    if (!this.verifyState()){
      this.route.navigate(['login']);
    } else {
      const getTokenParamter: TwitchLoginTokenParameter = this.codeFlowReponse;
      const query = new HttpParams({fromObject: getTokenParamter})
      this.httpService.get({url: HostWebApis.TwitchAuthToken, params: query}).subscribe({
        next: res => {
          const tokenVm: TwitchLoginTokenViewModel = res.body;
          this.cookie.set(cookieKey.oauthAccessToken, tokenVm.accessToken);
          this.cookie.set(cookieKey.oauthRefreshToken, tokenVm.refreshToken);
          this.route.navigate(['home']);
        },
        error: error => {
          // TBD: use message diag to notice error to login
          console.log(`get twitch token with error: ${error}`);
          this.route.navigate(['Login'])
        }
      })
    }
  }

  setCodeFlowResponseFromRoute() {
    this.activedRoute.queryParams.subscribe(params => {
      this.codeFlowReponse = params
    })
  }
  
  verifyState(): boolean {
    let stateFromLoginPage = this.cookie.get(cookieKey.oauthState);
    if (stateFromLoginPage == ""){
      console.log('[TwitchLogin] not from login page');
      return false;
    }

    let stateFromTwitchResponse = this.codeFlowReponse.state
    if (stateFromTwitchResponse === undefined){
      console.log('[TwitchLogin] no parameters');
      return false;
    }

    if (stateFromLoginPage != stateFromTwitchResponse){
      console.log('[TwitchLogin] not same state')
      return false;
    }
    return true;
  }
}
