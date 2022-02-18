import { EmpleadoService } from './components/empleado.service';
import { Component, OnInit } from '@angular/core';
import {
  faAdd,
  faEdit,
  faEye,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Employee } from 'src/app/Class/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss'],
})
export class FormEmpleadoComponent implements OnInit {
  employees: Employee[] = [];
  iconSearch = faMagnifyingGlass;
  iconAdd = faAdd;
  iconEdit = faEdit;
  iconView = faEye;
  iconDelete = faTrash;

  constructor(private employeeSv: EmpleadoService, private route: Router) {}

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

  deleteItem(key: any) {
    this.employeeSv
      .delete(key)
      .then(() => {
        Swal.fire('test', 'Registro eliminado exitosamente', 'success');
      })
      .catch((err) => console.log(err));
  }

  updateRouter(item: Employee) {
    localStorage.setItem('data', JSON.stringify(item));
    this.route.navigate(['/update-employee/' + item.key]);
  }

  viewRouter(item: Employee) {
    localStorage.setItem('data', JSON.stringify(item));
    this.route.navigate(['/view-employee']);
  }
}
