import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ParagraphComponent } from "../../../../../../shared/components/paragraph/paragraph.component";
import { StatusBadgeComponent } from '../../../../../../shared/components/status-badge/status-badge.component';
import { CustomInputComponent } from "../../../../../../shared/components/custom-input/custom-input.component";
import { CardComponent } from "../../../../../../shared/components/card/card.component";

@Component({
  selector: 'app-authentications',
  imports: [TranslateModule, ParagraphComponent, StatusBadgeComponent, CustomInputComponent, CardComponent],
  templateUrl: './authentications.component.html',
  styleUrl: './authentications.component.css'
})
export class AuthenticationsComponent {

}
