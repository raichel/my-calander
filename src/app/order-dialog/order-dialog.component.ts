import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  getAsYouType,
  parsePhoneNumber,
  PhoneNumber,
  getExample,
} from 'awesome-phonenumber';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISO_3166_1_CODES } from './country-codes';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * The PhoneComponent presents a country selector and phone number
 * field that formats the phone number according to the selected
 * country's number standard.  The available awesome-phonenumber
 * metadata are presented as the phone number is entered.
 */
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
})
export class OrderDialogComponent {
  countyCodes = ISO_3166_1_CODES;
  profileForm = this.fb.group({
    name: '',
    phone: this.fb.group(
      {
        country: ['IL'],
        number: [''],
      },
      { validators: phoneValidator }
    ),
  });
  phoneErrorMatcher = new PhoneErrorMatcher();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  /**
   * Return a string containing only numeric values from the
   * phone.number form field.
   */
  get phoneNumberDigits(): string {
    return this.phoneNumberControl.value.replace(/\D/g, '');
  }

  /**
   * Return an {@see PhoneNumber} value created from the
   * phoneNumberDigits and currently selected country code.
   */
  get phoneNumber(): PhoneNumber {
    return parsePhoneNumber(
      this.phoneNumberDigits,
      this.phoneCountryControl.value
    );
  }

  /**
   * Formats the phone number digits using the 'national' format
   * from awesome-phonenumber.
   */
  formatNumber() {
    const natNum = this.phoneNumber.getNumber('national');
    this.phoneNumberControl.setValue(natNum ? natNum : this.phoneNumberDigits);
  }

  /**
   * Generate a hint using the {@see PhoneNumber} getExample method
   * with the currently selected country.
   */
  get phoneHint(): string {
    return getExample(this.phoneCountryControl.value, 'mobile').getNumber(
      'national'
    );
  }

  /**
   * Get the [E.164]{@link https://en.wikipedia.org/wiki/E.164} formatted
   * phone number typically required by systems for making calls and
   * sending text messages.
   */
  get phoneE164(): string {
    return this.phoneNumber.getNumber('e164');
  }

  // FormControl Getters
  get phoneGroup() {
    return this.profileForm.get('phone') as FormControl;
  }

  get phoneCountryControl() {
    return this.profileForm.get('phone.country') as FormControl;
  }

  get phoneNumberControl() {
    return this.profileForm.get('phone.number') as FormControl;
  }

  get name() {
    return this.profileForm.get('name') as FormControl;
  }

  onDoneClicked() {
    this.dialogRef.close({
      name: this.name.value,
      phone: this.phoneNumber.getNumber(),
    });
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}

/**
 * Validates a FormGroup containing `country` and `number` fields that
 * are used to generate a {@see PhoneNumber}. Valid numbers are
 * determined by the PhoneNumber.isValid() method.
 */
export const phoneValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const country = form.get('country');
  const num = form.get('number');
  if (
    num?.value &&
    country?.value &&
    !parsePhoneNumber(num.value, country.value).isValid()
  ) {
    return { invalidPhone: true };
  } else {
    return null;
  }
};

/**
 * {@see ErrorStateMatcher} used to update the error state of the
 * phone number when the country or phone number changes.
 */
export class PhoneErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control!.value && control!.touched && !control?.parent?.valid);
  }
}
