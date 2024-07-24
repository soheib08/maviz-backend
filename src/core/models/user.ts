export class User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  phone_number: string;
  register_date: Date;
  constructor(phone_number: string, email: string) {
    this.email = email;
    this.phone_number = phone_number;
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

export enum Role {
  Admin = 'admin',
  User = 'user',
}
