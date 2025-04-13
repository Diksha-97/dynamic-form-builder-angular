import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormField } from '../models/form-field.model';

@Injectable({
  providedIn: 'root'
})

export class FormService {
  private fields = new BehaviorSubject<FormField[]>([]);
  fields$ = this.fields.asObservable();

  addField(field: FormField) {
    const current = this.fields.value;
    this.fields.next([...current, field]);
  }
  removeField(index: number) {
    const current = [...this.fields.value];
    current.splice(index, 1);
    this.fields.next(current);
  }

  getFields() {
    return this.fields.value;
  }

  clearFields() {
    this.fields.next([]);
  }


}
