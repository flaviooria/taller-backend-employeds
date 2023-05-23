import { Employed } from './src/employed/domain/employed';
import { User } from './src/user/domain/user';

export type ValidTypesToAuth = Pick<User, 'email'> | Pick<Employed, 'email'>;
