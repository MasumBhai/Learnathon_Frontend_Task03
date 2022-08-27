import { JwtAuthGuard } from './jwt-auth-guard';

describe('JwtAuthGuard', () => {
  it('should create an instance', () => {
    expect(new JwtAuthGuard()).toBeTruthy();
  });
});
