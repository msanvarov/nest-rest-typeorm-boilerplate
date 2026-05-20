import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { UserActionsEnum, UserRolesEnum } from '@starter/api-types';

import { User } from '../users/user.entity';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[UserActionsEnum, Subjects]>;

@Injectable()
export class CaslFactory {
  createForUser(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.roles?.some(({ role }) => role === UserRolesEnum.SUDO)) {
      can(UserActionsEnum.Manage, 'all');
    } else {
      can(UserActionsEnum.Read, 'all');
    }

    can(UserActionsEnum.Update, User, { username: user.username });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
