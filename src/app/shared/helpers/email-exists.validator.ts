import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

export class EmailExistsValidator {
  static validate(accountService: AccountService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return of(control.value).pipe(
        delay(500),
        //Then instead return the observable of us actually checking the value.
        switchMap((email) =>
          accountService.checkEmailExists(email).pipe(
            map((result) => {
              return result ? { emailExists: true } : null;
            })
          )
        )
      );
    };
  }
}
