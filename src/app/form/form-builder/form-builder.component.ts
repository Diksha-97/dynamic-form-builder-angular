import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  // simplified version
  fieldTypes = ['text', 'textarea', 'radio', 'checkbox', 'dropdown'];
  field = {
    type: 'text',
    label: '',
    placeholder: '',
    required: false,
    options: [{ label: '', value: '' }]
  };

  constructor(private formService: FormService) { }
  ngOnInit(): void {
    console.log('Method implemented.');
  }
  validateField(field: FormField) {
    const requiredTypesWithOptions = ['radio', 'checkbox', 'dropdown'];

    // Rule 1: label is required
    if (!field.label || field.label.trim() === '') {
      return { valid: false, error: "Label is required." };
    }

    // Rule 2: placeholder is optional — no validation needed

    // Rule 3: options array required for specific types
    if (requiredTypesWithOptions.includes(field.type)) {
      if (!Array.isArray(field.options) || field.options.length === 0) {
        return { valid: false, error: `Options are required for type '${field.type}'.` };
      }

      for (const [i, option] of field.options.entries()) {
        if (!option.label || !option.value) {
          return {
            valid: false,
            error: `Option ${i+1} is missing 'label' or 'value'.`
          };
        }
      }
    }

    // All validations passed
    return { valid: true };
  }

  addOption() {
    this.field.options?.push({ label: '', value: '' });
  }

  removeOption(index: number) {
    this.field.options?.splice(index, 1);
  }

  addField() {
    // Validation
    const result = this.validateField(this.field as FormField);
    if (result.error) {
      alert(result.error);
      return;
    }

    this.formService.addField(this.field as FormField);

    this.resetForm();
  }
  showOptions(type: string) {
    return ['radio', 'checkbox', 'dropdown'].includes(type);
  }
  resetForm() {
    this.field = {
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: [{ label: '', value: '' }]
    };
  }
}
