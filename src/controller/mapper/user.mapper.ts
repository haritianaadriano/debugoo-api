import { SignupApi } from '../api/signup.rest';
import { UserApi } from '../api/user.rest';
import { WhoamiApi } from '../api/whoami.rest';
import { User } from './../../model/user.entity';

export class UserMapper {
  constructor() {}

  async toWhoamiApi(
    user: Promise<{ user: User; bearer: string }>,
  ): Promise<WhoamiApi> {
    const whoamiApi = new WhoamiApi();

    whoamiApi.id = (await user).user.id;
    whoamiApi.bearer = await (await user).bearer;
    return whoamiApi;
  }

  async fromDomainToRest(user: User): Promise<UserApi> {
    const userApi = new UserApi();

    userApi.id = user.id;
    userApi.username = user.username;
    userApi.email = user.email;
    userApi.firstname = user.firstname;
    userApi.lastname = user.lastname;
    userApi.description = user.description;
    userApi.birthdate = user.birthdate;
    userApi.creation_datetime = user.creationDate;
    return userApi;
  }

  async toRest(promiseUser: Promise<User>): Promise<UserApi> {
    const userApi = new UserApi();

    const user = await promiseUser;
    userApi.id = user.id;
    userApi.username = user.username;
    userApi.email = user.email;
    userApi.firstname = user.firstname;
    userApi.lastname = user.lastname;
    userApi.description = user.description;
    userApi.birthdate = user.birthdate;
    userApi.creation_datetime = user.creationDate;
    return userApi;
  }

  userApiToDomain(userApi: UserApi): User {
    const user = new User();

    user.email = userApi.email;
    user.firstname = userApi.firstname;
    user.lastname = userApi.lastname;
    user.username = userApi.username;
    user.description = userApi.description;
    return user;
  }

  signupApiToDomain(signupApi: SignupApi): User {
    const user = new User();

    user.email = signupApi.email;
    user.firstname = signupApi.firstname;
    user.lastname = signupApi.lastname;
    user.password = signupApi.password;
    user.username = signupApi.username;
    user.birthdate = signupApi.birthdate;
    user.description = signupApi.description;
    return user;
  }
}
