import { Component, ViewEncapsulation, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // esecuzione solo se sono nel browser
      this.authService.autoLogin();
    }

    this.loggingService.printLog('Hello from AppComponent ngInit');
  }
}
