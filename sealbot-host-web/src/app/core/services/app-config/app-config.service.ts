import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AppConfig {
  url: string;
}

export interface IAppConfig {
  baseUrl: string;
  load: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public baseUrl: string = "";

  constructor(private readonly http: HttpClient) { }

  public load(): Promise<void> {
    return this.http
      .get<AppConfig>('assets/appConfig.json')
      .toPromise()
      .then(config => {
        this.baseUrl = config.url;
      });
  }
}

// export function initConfig(config: AppConfigService): () =>  Promise<void> {
  // return () => config.load();
// }
export function initConfig(config: AppConfigService): () =>  Promise<void> {
  return () => config.load();
}