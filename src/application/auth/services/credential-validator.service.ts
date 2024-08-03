import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isEmail, isPhoneNumber } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return isEmail(value) || isPhoneNumber(value, 'IR');
  }

  defaultMessage(args: ValidationArguments) {
    return 'The value must be a valid email address or phone number';
  }
}

export function IsEmailOrPhone(validationOptions?: ValidationOptions) {
  console.log(2);

  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailOrPhoneConstraint,
    });
  };
}

export function isEmailOrPhoneNumber(value?: string): 'email' | 'phone' {
  if (isEmail(value)) return 'email';
  else if (isPhoneNumber(value, 'IR')) return 'phone';
  else return;
}
