export type FieldType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'dropdown';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
}
