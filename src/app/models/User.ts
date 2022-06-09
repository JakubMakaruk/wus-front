import {UserAddress} from "./UserAddress";

export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  password!: string
  email!: string;
  phone!: string;
  roles!: [];
  addresses!: UserAddress[];
  jwtToken?: string;

  constructor(resp: any, jwtToken: string) {
    this.id = resp.id;
    this.firstname = resp.firstname;
    this.lastname = resp.lastname;
    this.password = resp.password;
    this.email = resp.email;
    this.phone = resp.phone;
    this.roles = resp.roles;
    this.addresses = resp.addresses;
    this.jwtToken = jwtToken;
  }
}
