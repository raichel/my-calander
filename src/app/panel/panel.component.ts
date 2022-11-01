import { Component, Input } from '@angular/core';
import { ICalanderTheme } from '../calander.interfaces';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  @Input() theme!: ICalanderTheme;
}
