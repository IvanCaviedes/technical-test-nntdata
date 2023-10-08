import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '@ntt-data/services/country/country.service';
import { Country } from '@ntt-data/services/country/country.types';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: UntypedFormGroup;
  resultSearch: boolean = false;
  arrayval = new Array(5).fill(0);
  countries: Country[] = [];
  showAlert: boolean = false;
  @ViewChild('signUpNgForm') signInNgForm!: NgForm;

  showPassword: boolean = false;

  alert: { message: string } = {
    message: '',
  };

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _countryService: CountryService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.signUpForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      country: ['Colombia', [Validators.required, Validators.minLength(3)]],
    });
  }
  searchCountry(searchTerm: string): void {
    if (searchTerm.length === 0) {
      this.resultSearch = false;
    }
    if (searchTerm.length >= 2) {
      const result = this._countryService.searchCountries(searchTerm);
      if (result) {
        this.resultSearch = true;
        this.countries = result;
      }
    }
  }
  selectCountry(country: string): void {
    this.signUpForm.patchValue({
      country: country,
    });
    this.resultSearch = false;
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpForm.disable();

    this._authService.signUp(this.signUpForm.value).subscribe(
      () => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/signed-in-redirect';
        this._router.navigateByUrl(redirectURL);
        this.selectCountry('Colombia');
        this.signUpForm.enable();
        this.signInNgForm.resetForm();
      },
      (response) => {
        this.signUpForm.enable();
        this.signInNgForm.resetForm();
        this.alert = {
          message: 'The user has already registered',
        };
        this.selectCountry('Colombia');
        this.showAlert = true;
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
