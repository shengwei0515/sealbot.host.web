import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchLoginPageComponent } from './twitch-login-page.component';

describe('TwitchLoginPageComponent', () => {
  let component: TwitchLoginPageComponent;
  let fixture: ComponentFixture<TwitchLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
