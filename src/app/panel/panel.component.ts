import { Component, Input } from '@angular/core';
import { ICalander } from '../calander.interfaces';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  @Input() image!: string;
}
