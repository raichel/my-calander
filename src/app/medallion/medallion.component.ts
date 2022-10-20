import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-medallion',
  templateUrl: './medallion.component.html',
  styleUrls: ['./medallion.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-360deg)' })),
      transition('rotated => default', animate('2000ms ease-out')),
      transition('default => rotated', animate('2000ms ease-in'))
  ])
]
})
export class MedallionComponent implements OnInit {
  
  state: string = 'default';

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  constructor() { }

  ngOnInit(): void {
  }

}