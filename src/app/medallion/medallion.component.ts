import {
  Component,
  OnInit,
  Output,
  HostListener,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { IMedallion } from '../calander.interfaces';

@Component({
  selector: 'app-medallion',
  templateUrl: './medallion.component.html',
  styleUrls: ['./medallion.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('hover', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotateY(-360deg)' })),
      // transition('rotated => default', animate('200ms ease-out')),
      transition('default => rotated', animate('200ms ease-in')),
    ]),
  ],
})
export class MedallionComponent {
  state: string = 'default';
  // The path to the relevant medallion image file
  imagePath: string = '/assets/item.png';

  @Input() medallion!: IMedallion;
  @Output() medallionClicked = new EventEmitter<IMedallion>();

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onHover(event: MouseEvent) {
    console.log(this.medallion.name);
    const direction = event.type === 'mouseenter' ? 'in' : 'out';
    // const host = event.target as HTMLElement;
    // const w = host.offsetWidth;
    // const h = host.offsetHeight;
    // const x = (event.pageX - host.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    // const y = (event.pageY - host.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    // const states = ['top', 'right', 'bottom', 'left'];
    // const side = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    this.state = direction === 'in' ? 'rotated' : 'default';
  }
}
