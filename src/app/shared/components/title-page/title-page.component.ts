import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppService } from '../../../core/services/app.service';
import { AuthService } from '../../../core/services/auth.service';
 
@Component({
  selector: 'app-title-page',
  imports: [TranslateModule],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.css'
})
export class TitlePageComponent {

  @Input({ required: true }) title: string = '';

  constructor(
    public appService: AppService,
    public authService: AuthService
  ) {

  }

  logout() {
    this.authService.logout();
  }
}
