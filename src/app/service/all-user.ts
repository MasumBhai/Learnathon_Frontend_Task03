export class AllUser {
  id!: string;
  username!: string;
  email!: string;
  birthday!: string;
  hashPassword!: string;

  constructor(id: string, username: string, email: string, birthday: string, hashPassword: string) {
    this.id = id;
    this.username = username;
    this.birthday = birthday;
    this.hashPassword = hashPassword;
    this.email = email;
  }

}
