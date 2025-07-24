export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  guideMessage?: string;
}

export interface ValidationRule<T> {
  (value: T): ValidationResult;
}

export interface ValidateFn<T> {
  (value: T, rules: ValidationRule<T>[]): void;
}
