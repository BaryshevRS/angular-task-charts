import { Component } from '@angular/core';
import { Co2EmissionsFormComponent } from "./components/co2-emissions-form/co2-emissions-form.component";

@Component({
  selector: 'app-co2-emissions-container',
  standalone: true,
  imports: [
    Co2EmissionsFormComponent
  ],
  templateUrl: './co2-emissions-container.component.html',
  styleUrl: './co2-emissions-container.component.scss'
})
export class Co2EmissionsContainerComponent {

}
