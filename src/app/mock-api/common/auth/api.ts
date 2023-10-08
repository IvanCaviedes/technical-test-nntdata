import { Injectable } from '@angular/core';
import { MockApiService, NttDataMockApiUtils } from '@ntt-data/lib/mock-api';
import { cloneDeep } from 'lodash-es';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';

import { UserDaraMock, user as userData } from 'app/mock-api/common/user/data';

@Injectable({
  providedIn: 'root',
})
export class AuthMockApi {
  private _user: UserDaraMock[] = userData;
  private readonly _secret: any;

  constructor(private _MockApiService: MockApiService) {
    this._secret = 'SECRET_JWT_TOKEN';
    this.registerHandlers();
  }

  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Sign in - POST
    // -----------------------------------------------------------------------------------------------------
    this._MockApiService
      .onPost('api/auth/sign-in', 1500)
      .reply(({ request }) => {
        // Sign in successful
        const { username, password, country } = request.body;

        const foundUser = this._user.find(
          (u) =>
            u.username === username &&
            u.password === password &&
            u.country === country
        );

        if (foundUser) {
          return [
            200,
            {
              user: cloneDeep(foundUser),
              accessToken: this._generateJWTToken(),
              tokenType: 'bearer',
            },
          ];
        }

        // Invalid credentials
        return [404, false];
      });

    this._MockApiService
      .onPost('api/auth/sign-up', 1500)
      .reply(({ request }) => {
        const { username, password, country } = request.body;

        const foundUser = this._user.find(
          (u) =>
            u.username === username &&
            u.password === password &&
            u.country === country
        );

        if (foundUser) {
          return [409, false]; // Conflict
        }

        this._user.push({
          id: NttDataMockApiUtils.guid(),
          country,
          password,
          username,
          profile: `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`,
        });

        let user = cloneDeep(this._user.find((u) => u.username === username));

        return [
          200,
          {
            user: cloneDeep(user),
            accessToken: this._generateJWTToken(),
            tokenType: 'bearer',
          },
        ];
      });
  }
  private _generateJWTToken(): string {
    // Define token header
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    // Calculate the issued at and expiration dates
    const date = new Date();
    const iat = Math.floor(date.getTime() / 1000);
    const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

    // Define token payload
    const payload = {
      iat: iat,
      iss: 'Fuse',
      exp: exp,
    };

    // Stringify and encode the header
    const stringifiedHeader = Utf8.parse(JSON.stringify(header));
    const encodedHeader = this._base64url(stringifiedHeader);

    // Stringify and encode the payload
    const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
    const encodedPayload = this._base64url(stringifiedPayload);

    // Sign the encoded header and mock-api
    let signature: any = encodedHeader + '.' + encodedPayload;
    signature = HmacSHA256(signature, this._secret);
    signature = this._base64url(signature);

    // Build and return the token
    return encodedHeader + '.' + encodedPayload + '.' + signature;
  }

  private _base64url(source: any): string {
    // Encode in classical base64
    let encodedSource = Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    // Return the base64 encoded string
    return encodedSource;
  }
}
