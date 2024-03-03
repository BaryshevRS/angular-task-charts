import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatHint } from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Co2Data, CO2FormData } from "../../models/co2-data.interface";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-co2-emissions-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatFormField,
    MatIcon,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatButton,
    MatInput,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
  ],
  providers: [],
  templateUrl: './co2-emissions-form.component.html',
  styleUrl: './co2-emissions-form.component.scss'
})
export class Co2EmissionsFormComponent {
  @Input() formData: CO2FormData = {
    name: '',
    date: '',
    title: ''
  };
  @Output() submit = new EventEmitter<Co2Data>();
  form = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern(/^[0-9]+$/)
      ]),
      date: new FormControl(null, [Validators.required]),
    }
  )

  cancelForm() {
    this.form.reset();
    this.form.markAsPristine();
  }

  formSubmit() {
    const {name = '', date = ''} = this.form.value;
    if (name && date) {
      this.submit.emit({
        name,
        date
      });
      this.cancelForm()
    }
  }
}
