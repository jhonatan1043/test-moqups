import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/Interface/IEmployee';
import {
  faAdd,
  faEdit,
  faEye,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { EmpleadoService } from '../components/empleado.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss'],
})
export class FormEmpleadoComponent implements OnInit {
  employees: IEmployee[] = [];
  iconSearch = faMagnifyingGlass;
  iconAdd = faAdd;
  iconEdit = faEdit;
  iconView = faEye;
  iconDelete = faTrash;

  constructor(private employeeSv: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeSv
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data: any) => {
        this.employees = data;
      });
  }
}
