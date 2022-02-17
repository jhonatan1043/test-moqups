import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import * as moment from 'moment';
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
  countries: any;
  tab: string = '';
  positionArray: any;
  commissionStatus: boolean = false;
  empleado!: Employee;

  constructor(private empleadoSv: EmpleadoService, private route: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.changerCountrys();
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      area: new FormControl(''),
      position: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      user: new FormControl(
        '',
        Validators.compose([
          Validators.pattern('[A-Za-z0-9]{1,15}'),
          Validators.required,
        ])
      ),
      hiringdate: new FormControl('', Validators.required),
      commission: new FormControl(0),
      status: new FormControl(false),
      dateBirth: new FormControl('', Validators.required),
      age: new FormControl('', Validators.min(18)),
    });
  }

  changerCountrys() {
    this.empleadoSv
      .getCountries()
      .then((data) => {
        this.countries = data;
      })
      .catch((err) => console.error(err));
  }

  tabChange(tabSelect: string) {
    this.tab = tabSelect;
    this.commissionStatus = false;
    if (this.tab === 'Administrativa') {
      this.positionArray = [
        { id: 3, name: 'Fundador y CEO' },
        { id: 4, name: 'Recurso Humanos' },
      ];
    } else {
      this.positionArray = [
        { id: 1, name: 'Diseñador' },
        { id: 2, name: 'Programador' },
      ];
    }
  }

  selectPosition() {
    if (this.form.get('position')?.value == 3) {
      this.commissionStatus = true;
    } else {
      this.commissionStatus = false;
    }
  }

  calculateAge() {
    const fechaAct = moment();
    const fechaNac = moment(`${this.form.get('dateBirth')?.value}`).format();
    const valueDif = fechaAct.diff(fechaNac, 'years');
    this.form.patchValue({ age: valueDif });
  }

  create() {
    this.empleado = new Employee(
      this.form.get('name')?.value,
      this.form.get('area')?.value,
      this.form.get('dateBirth')?.value,
      this.form.get('position')?.value,
      this.form.get('hiringdate')?.value,
      this.form.get('country')?.value,
      this.form.get('user')?.value,
      this.form.get('commission')?.value,
      this.form.get('status')?.value,
      this.form.get('age')?.value
    );

    this.empleadoSv
      .create(this.empleado)
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
