import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    FormBuilderComponent,
    FormPreviewComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormModule { }
