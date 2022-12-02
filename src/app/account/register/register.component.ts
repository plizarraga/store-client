import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailExistsValidator } from 'src/app/shared/helpers/email-exists.validator';
import MatchingValidator from 'src/app/shared/helpers/matching.validator';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public form: FormGroup;
  public errorsMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.email],
          [EmailExistsValidator.validate(this.accountService)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validators: [
          MatchingValidator.match('password', 'passwordConfirmation'),
        ],
      } as AbstractControlOptions
    );
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/shop');
      },
      error: (e) => {
        this.errorsMessages = e.errors;
        console.error(e);
      },
    });
  }
}
