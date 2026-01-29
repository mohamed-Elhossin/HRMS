import {Component, HostBinding, Input, OnInit} from '@angular/core';
import icons from './icons.json';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-keenicon',
  templateUrl: './keenicon.component.html',
  imports: [NgIf,NgFor],
  standalone: true,
  styleUrls: ['./keenicon.component.scss']
})
export class KeeniconComponent implements OnInit {
  @Input({required: true}) name: any = '';
  @Input() class: any = '';
  @Input() iconStyle: any = '';
  @Input() type: any = 'outline';

  pathsNumber: number = 0;

  constructor() {
  }

  ngOnInit() {
    if (this.type === 'duotone') {
      // @ts-ignore
      this.pathsNumber = icons[this.type + '-paths'][this.name] ?? 0;
    }
  }

  @HostBinding('style.display')
  get styleDisplay() {
    return 'inline-block';
  }
}
