export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  guideMessage?: string;
}

export interface ValidationRule<T> {
  (value: T): ValidationResult;
}

export interface Validator<T> {
  (value: T): ValidationResult;
}

export interface ValidateFn {
  <T>(key: string, value: T, rules: ValidationRule<T>[]): boolean;
}
