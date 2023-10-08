import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { CountryService } from '@ntt-data/services/country/country.service';
import { Country } from '@ntt-data/services/country/country.types';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInForm: UntypedFormGroup;
  resultSearch: boolean = false;
  arrayval = new Array(5).fill(0);
  countries: Country[] = [];
  showAlert: boolean = false;
  @ViewChild('signInNgForm') signInNgForm!: NgForm;

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
    this.signInForm = this._formBuilder.group({
      username: ['juan', [Validators.required]],
      password: ['123456', Validators.required],
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
    this.signInForm.patchValue({
      country: country,
    });
    this.resultSearch = false;
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();

    this._authService.signIn(this.signInForm.value).subscribe(
      () => {
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/signed-in-redirect';
        this._router.navigateByUrl(redirectURL);
        this.signInForm.enable();
        this.selectCountry('colombia');
        this.signInNgForm.resetForm();
      },
      (response) => {
        this.signInForm.enable();
        this.signInNgForm.resetForm();
        this.alert = {
          message: 'Wrong email or password',
        };
        this.selectCountry('colombia');
        this.showAlert = true;
      }
    );
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
