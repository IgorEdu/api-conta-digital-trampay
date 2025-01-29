import { Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthorizationService {
  async validateJwt(jwtToken: string): Promise<boolean> {
    if (jwtToken === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.172yx9voUraczboeIpAgitIE3NWezMxFxtIcQeg0ZDE') {
      return true;
    } else {
      return false;
    }
  }
}
