import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Employee } from 'src/app/Class/Employee';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.scss'],
})
export class UpdateEmpleadoComponent implements OnInit {
  form!: FormGroup;
  data!: any;
  employee!: Employee;
  valid!: boolean;
  name!: string;
  key!: string;

  constructor(private route: Router, private empleadoSv: EmpleadoService) {}

  ngOnInit(): void {
    let jsonData = localStorage.getItem('data');
    if (jsonData) {
      this.data = JSON.parse(jsonData);
      this.key = this.data.key;
      localStorage.removeItem('data');
      this.name = this.data.name;
    } else {
      this.route.navigate(['']);
    }
  }

  dataEmit(form: FormGroup) {
    this.form = form;
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.valid = form.valid;
      this.data = data;
    });
  }

  update() {
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

    this.employee = new Employee(
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
      .update(this.key, this.employee)
      .then(() => {
        swal
          .fire('Moqups', 'Registro actualizado exitosamente', 'success')
          .then(() => {
            this.route.navigate(['']);
          });
      })
      .catch((err: any) => console.log(err));
  }
}
