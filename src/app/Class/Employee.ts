export class Employee {
  name?: string;
  area?: string;
  dateBirth?: Date;
  position?: string;
  hiringdate?: Date;
  country?: string;
  user?: string;
  commission?: number;
  status?: boolean;
  age?: number;
  constructor(
    name: string,
    area: string,
    dateBirth: Date,
    position: string,
    hiringdate: Date,
    country: string,
    user: string,
    commission: number,
    status: boolean,
    age: number
  ) {
    this.name = name;
    this.area = area;
    this.dateBirth = dateBirth;
    this.position = position;
    this.hiringdate = hiringdate;
    this.country = country;
    this.user = user;
    this.commission = commission;
    this.status = status;
    this.age = age;
  }
}
