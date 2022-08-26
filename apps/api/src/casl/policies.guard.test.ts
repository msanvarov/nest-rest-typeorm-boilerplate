import { Reflector } from '@nestjs/core';

import { CaslAbilityFactory } from './casl-ability.factory';
import { PoliciesGuard } from './policies.guard';

describe('PoliciesGuard', () => {
  it('should be defined', () => {
    const reflector: Reflector = new Reflector();
    const caslAbilityFactory = new CaslAbilityFactory();
    expect(new PoliciesGuard(reflector, caslAbilityFactory)).toBeDefined();
  });
});
