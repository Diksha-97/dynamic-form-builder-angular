import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  fields: FormField[] = [];
  fieldValidationErrors: { [label: string]: string } = {};

  constructor(private formService: FormService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formService.fields$.subscribe(fields => {
      this.fields = fields;
      console.log('working.');

      this.buildForm();
    });
  }
  
  buildForm() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.label] = field.required ? new FormControl('', Validators.required) : new FormControl('');
    });
    this.form = this.fb.group(group);
  }
  removeField(index: number) {
    this.formService.removeField(index);
  }
  
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 💡 triggers validation messages
      return;
    }
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Form submitted successfully!');
    }
  }


}
