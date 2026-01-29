import { Component, OnDestroy, OnInit } from '@angular/core';
import { menuItems } from '../../../core/constants/menuItems';
import { AppService } from '../../../core/services/app.service';
import { RouterModule } from '@angular/router';
import { CustomButtonComponent } from "../custom-button/custom-button.component";
import { NgClass } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { fromEvent, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { KeeniconComponent } from "../keenicon/keenicon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CustomButtonComponent, NgClass, KeeniconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  menu: { title: string, routerLink: string, icon: any, role: string }[] = menuItems
  hovering: boolean = false;
  isMinimize:boolean = false;
  isScreenSmall:boolean = false;

  constructor(
    public appService: AppService,
    public sidebarService: SidebarService
  ) { }


  ngOnInit(): void {
    this.subscriptions.add(
      fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth), // لتشغيله أول مرة عند التحميل
        map(width => width < 1024)    // حدد هنا العرض المناسب للتصغير (مثلاً 1024 للـlg)
      )
      .subscribe(shouldMinimize => {
        this.isMinimize = shouldMinimize;
        this.isScreenSmall = shouldMinimize;
      })
    )
  }

  toggleSideBar() {
    this.isMinimize = !this.isMinimize
  }

    ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
