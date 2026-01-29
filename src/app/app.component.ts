import { Component, Renderer2 } from '@angular/core';
import { AppService } from './core/services/app.service';
import { RouterModule } from '@angular/router';
import { CustomAlertComponent } from "./shared/components/custom-alert/custom-alert.component";

@Component({
    selector: 'app-root',
    imports: [RouterModule, CustomAlertComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private renderer: Renderer2,
    private appService: AppService
  ) {
    this.appService.setRenderer(this.renderer);
  }
}
