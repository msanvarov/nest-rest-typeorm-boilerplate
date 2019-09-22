import { AuthTokenGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthTokenGuard()).toBeDefined();
  });
});
