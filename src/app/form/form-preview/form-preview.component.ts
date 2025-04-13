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
  

  validateField(field: FormField): boolean {
    if (!field.label || field.label.trim() === '') {
      this.fieldValidationErrors[field.label || 'unknown'] = 'Label is required.';
      return false;
    }
  
    const needsOptions = ['radio', 'checkbox', 'dropdown'];
    if (needsOptions.includes(field.type)) {
      if (!Array.isArray(field.options) || field.options.length === 0) {
        this.fieldValidationErrors[field.label] = `Options are required for '${field.type}'.`;
        return false;
      }
  
      for (const [i, opt] of field.options.entries()) {
        if (!opt.label || !opt.value) {
          this.fieldValidationErrors[field.label] = `Each option must have a label and value.`;
          return false;
        }
      }
    }
  
    // If no errors, clear any existing
    delete this.fieldValidationErrors[field.label];
    return true;
  }
  
  buildForm() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.label] = field.required ? new FormControl('', Validators.required) : new FormControl('');
    });
    this.form = this.fb.group(group);
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
