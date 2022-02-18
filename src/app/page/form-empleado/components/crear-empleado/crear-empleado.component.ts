import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { Employee } from 'src/app/Class/Employee';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.scss'],
})
export class CrearEmpleadoComponent implements OnInit {
  form!: FormGroup;
  data!: any;
  employees!: Employee;
  valid!: boolean;

  constructor(private empleadoSv: EmpleadoService, private route: Router) {}

  ngOnInit(): void {}

  dataEmit(form: FormGroup) {
    this.form = form;
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.valid = form.valid;
      this.data = data;
    });
  }

  create() {
    const {
      name,
      area,
      dateBirth,
      position,
      hiringdate,
      country,
      user,
      commission,
      status,
      age,
    } = this.data;

    this.employees = new Employee(
      name,
      area,
      dateBirth,
      position,
      hiringdate,
      country,
      user,
      commission,
      status,
      age
    );

    this.empleadoSv
      .create(this.employees)
      .then(() => {
        swal
          .fire('Moqups', 'Registro Guardado exitosamente', 'success')
          .then(() => {
            this.route.navigate(['']);
          });
      })
      .catch((err: any) => console.log(err));
  }
}
