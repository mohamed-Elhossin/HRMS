import { Component } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-card',
  imports: [PersonalInfoComponent, TranslateModule],
  templateUrl: './personal-card.component.html',
  styleUrl: './personal-card.component.css'
})
export class PersonalCardComponent{


}
