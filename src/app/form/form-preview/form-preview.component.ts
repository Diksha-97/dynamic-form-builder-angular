
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnChanges {
  @Input() fields: any[] = [];
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.label] = field.required ? this.fb.control('', Validators.required) : this.fb.control('');
    });
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill required fields.');
    }
  }
}
