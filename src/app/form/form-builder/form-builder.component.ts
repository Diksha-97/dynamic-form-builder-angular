import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  @Output() fieldAdded = new EventEmitter<any>();
  fieldForm: FormGroup;

  fieldTypes = ['text', 'textarea', 'radio', 'checkbox', 'dropdown'];

  constructor(private fb: FormBuilder) {
    this.fieldForm = this.fb.group({
      type: ['text', Validators.required],
      label: ['', Validators.required],
      placeholder: [''],
      required: [false],
      options: this.fb.array([])
    });
  }

  get options(): FormArray {
    return this.fieldForm.get('options') as FormArray;
  }

  showOptions(): boolean {
    const type = this.fieldForm.get('type')?.value;
    return ['radio', 'checkbox', 'dropdown'].includes(type);
  }

  addOption() {
    this.options.push(this.fb.group({
      label: [''],
      value: ['']
    }));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      this.fieldAdded.emit(this.fieldForm.value);
      this.fieldForm.reset({ type: 'text', required: false, options: [] });
      while (this.options.length) {
        this.options.removeAt(0);
      }
    }
  }
}
