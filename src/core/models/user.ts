export class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  phone_number: string;
  register_date: Date;
  refresh_token: string;
  constructor() {
    this.role = Role.User;
    this.register_date = new Date();
  }

  get name() {
    return `${this.first_name} ${this.last_name}`;
  }

  setRole(role: Role) {
    this.role = role;
  }
}

export class UserWithEmailBuilder extends User {
  constructor(credential: string) {
    super();
    this.email = credential;
  }
}

export class UserWithPhoneNumberBuilder extends User {
  constructor(credential: string) {
    super();
    this.phone_number = credential;
  }
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}
