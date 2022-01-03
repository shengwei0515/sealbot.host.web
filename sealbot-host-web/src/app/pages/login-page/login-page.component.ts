import { Component, OnInit } from '@angular/core';
import { TwitchApis, TwitchOauthCodeFlowGetCodeParameter, TwitchOauthCodeFlowGetCodeResponse } from 'src/app/core/services/http/twitch.content';
import { HostWebApis, AuthLoginParameter, AuthLoginResponse } from 'src/app/core/services/http/host-webapi.content';
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

  authPayload = {
    client_id: 'd6vb8ffiio5l89hdqi0oyahami1j5b',
    redirect_uri: 'http://localhost:4200/login',
    response_type: 'code',
    scope: 'user:read:email',
  } as TwitchOauthCodeFlowGetCodeParameter;


  twichAuthLink: String = "";

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
      this.setLoginHref()
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

  setOauthState() {
    this.authPayload.state = Math.random().toString(36).slice(2);
    this.cookie.set('_oauth_state', this.authPayload.state);
  }

  setLoginHref(){
    this.setOauthState()
    let params = new HttpParams({fromObject: this.authPayload})
    this.twichAuthLink = `${TwitchApis.OAUTH2_AUTHORIZE}?${params.toString()}`;
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
