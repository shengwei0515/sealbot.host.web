import { Component, OnInit } from '@angular/core';
import { TwitchOauthCodeFlowGetCodeResponse } from 'src/app/core/services/http/twitch.content';
import { HostWebApis, TwitchLoginAuthorizePageUrlResponse, AuthLoginParameter, AuthLoginResponse } from 'src/app/core/services/http/host-webapi.content';
import { HttpService } from 'src/app/core/services/http/http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  ifShowPage: boolean = true;
  twitchAuthorizePageUrl = {} as TwitchLoginAuthorizePageUrlResponse;

  constructor(
    private route:ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    const twitchResponse = this.route.snapshot.queryParams as TwitchOauthCodeFlowGetCodeResponse;
    if (!twitchResponse['code']){
      // not yet login now
      this.ifShowPage = true;
      this.getAuthorizePageUrl()
    }
    else{
      // user click login, pass data to backend to get jwt token
      this.ifShowPage = false;

      // verify state to prevent CSRF
      this.verifyState(twitchResponse)

      // get token
      this.getAccessTokenAndStoreInCookie(twitchResponse)
    }
  }

  getAuthorizePageUrl() {
    this.http.get({url: HostWebApis.TwitchLoginAuthorizePageUrl}).subscribe(
      res => {
        this.twitchAuthorizePageUrl = res.body;
        console.log(this.twitchAuthorizePageUrl.url)
      }
    )
  }

  verifyState(twitchResponse: TwitchOauthCodeFlowGetCodeResponse) {
    if (this.cookie.get('_oauth_state') != twitchResponse['state']){
      this.router.navigate(['error'])
    }
  }

  getTokenWithCodeFlow(twitchGantResponse: TwitchOauthCodeFlowGetCodeResponse): Observable<AuthLoginResponse> {
    const queryObject: AuthLoginParameter = twitchGantResponse;
    const queryParams = new HttpParams({fromObject: queryObject});
    return this.http.get({url: HostWebApis.AuthLogin, params: queryParams}).pipe(map( res => res.body));
  }

  getAccessTokenAndStoreInCookie(twitchResponse: TwitchOauthCodeFlowGetCodeResponse){
    this.getTokenWithCodeFlow(twitchResponse).subscribe({
      next: (loginRes) => {
        this.cookie.set('twitch_access_token', loginRes.access_token);
        this.cookie.set('twitch_refresh_token', loginRes.refresh_token);
        this.router.navigate(['home'])
      },
      error: (err) => {
        console.log(`login failed with error: ${err}`);
        this.router.navigate(['error'])
      }});
  }
}
