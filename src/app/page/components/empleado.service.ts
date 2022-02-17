import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from '../../Class/Employee'

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {

  private dbPath = '/employees';

  employeeRef: AngularFireList<Employee>;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.employeeRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Employee> {
    return this.employeeRef;
  }

  create(employee: Employee): any {
    return this.employeeRef.push(employee);
  }

  update(key: string, value: any): Promise<void> {
    return this.employeeRef.update(key, value);
  }

  delete(id: string): Promise<void> {
    return this.employeeRef.remove(id);
  }

  async getToken() {
    let email = 'jhonat.rodri@gmail.com';
    let token =
      'r-eTNoVb6d9vEIqE_71-sMryUtYbuMz7zR-v1ds3MsU69mqlz3pK0uUDOKkCR4NKIDM';
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('api-token', token);
    headers = headers.append('user-email', email);
    //let endpoint = "/inquiry";
    let endpoint = 'https://www.universal-tutorial.com/api/getaccesstoken';

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            let apiToken = data.auth_token;
            resolve(apiToken);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
  async getCountries() {
    let headers = new HttpHeaders();
    let token = await this.getToken();

    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    let endpoint = 'https://www.universal-tutorial.com/api/countries/';

    return new Promise((resolve, reject) => {
      this.http
        .get(endpoint, {
          headers: headers,
        })
        .subscribe(
          (data: any) => {
            resolve(data);
          },
          (error: any) => {
            reject(new Error(error.message));
          }
        );
    });
  }
}
