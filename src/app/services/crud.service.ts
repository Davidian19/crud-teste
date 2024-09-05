import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IEmployee } from '../models/crud.models';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudListServices {
  [x: string]: any;
  private path = environment.api;
  constructor(private httpClient: HttpClient) {}

  getEmployees() {
    return this.httpClient.get<IEmployee[]>(this.path + 'medicals-crud');
  }

  getEmployee(id: string) {
    return this.httpClient.get<IEmployee>(this.path + 'medicals-crud/' + id);
  }
  updateEmployee(id: string, employee: IEmployee): Observable<IEmployee> {
    if (!id) {
      console.error('ID inválido para atualização');
      return throwError(() => new Error('ID inválido para atualização'));
    }

    return this.httpClient.patch<IEmployee>(
      `${this.path}medicals-crud/${id}`,
      employee
    );
  }
  deleteEmployee(id: string) {
    return this.httpClient.delete(this.path + 'medicals-crud/' + id);
  }
  createEmployee(employee: any) {
    return this.httpClient.post(this.path + 'medicals-crud', employee);
  }
}
