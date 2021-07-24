import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationStateService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'new-sallatty';
  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang('en');
  }
}
