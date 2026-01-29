import { NgClass } from '@angular/common';
import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  defaultClass = 'custom-shadow rounded-xl p-4 border-2';
  @Input('cardClass') cardClass: string = 'bg-white'

}
