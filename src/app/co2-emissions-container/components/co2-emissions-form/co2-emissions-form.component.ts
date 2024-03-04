import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
import { Co2Data, CO2FormData, CO2FormId } from "../../models/co2-data.interface";
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
  styleUrl: './co2-emissions-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Co2EmissionsFormComponent {
  @Input() formData: CO2FormData = {
    name: '',
    date: '',
    title: '',
    id: CO2FormId.Gas
  };
  @Output() submit = new EventEmitter<Co2Data>();
  form = new FormGroup(
    {
      value: new FormControl('', [
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
    const {value = 0, date = ''} = this.form.value;
    if (value && date) {
      this.submit.emit({
        value: +value,
        date
      });
      this.cancelForm()
    }
  }
}
