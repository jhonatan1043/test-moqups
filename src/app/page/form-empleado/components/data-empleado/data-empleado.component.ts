import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import * as moment from 'moment';
import { Employee } from 'src/app/Class/Employee';

@Component({
  selector: 'app-data-empleado',
  templateUrl: './data-empleado.component.html',
  styleUrls: ['./data-empleado.component.scss'],
})
export class DataEmpleadoComponent implements OnInit {
  form!: FormGroup;
  countries: any;
  tab: string = '';
  positionArray: any;
  commissionStatus: boolean = false;

  @Input() employee!: Employee;
  @Input() status: boolean = false;
  @Output() formChanged: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(
    private empleadoSv: EmpleadoService,
    private formbuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.changerCountrys();
  }

  buildForm() {
    this.form = this.formbuild.group({
      name: [
        {
          value: this.employee ? this.employee.name : '',
          disabled: this.status,
        },
        Validators.required,
      ],
      area: [this.employee ? this.employee.area : ''],
      position: [
        {
          value: this.employee ? this.employee.position : '',
          disabled: this.status,
        },
        Validators.required,
      ],
      country: [
        {
          value: this.employee ? this.employee.country : '',
          disabled: this.status,
        },
        Validators.required,
      ],
      user: [
        {
          value: this.employee ? this.employee.user : '',
          disabled: this.status,
        },
        Validators.compose([
          Validators.pattern('[A-Za-z0-9]{1,15}'),
          Validators.required,
        ]),
      ],
      hiringdate: [
        {
          value: this.employee ? this.employee.hiringdate : '',
          disabled: this.status,
        },
        Validators.required,
      ],
      commission: [
        {
          value: this.employee ? this.employee.commission : '',
          disabled: this.status,
        },
      ],
      status: [
        {
          value: this.employee ? this.employee.status : false,
          disabled: this.status,
        },
      ],
      dateBirth: [
        {
          value: this.employee ? this.employee.dateBirth : '',
          disabled: this.status,
        },
        Validators.required,
      ],
      age: [this.employee ? this.employee.age : 0, Validators.min(18)],
    });

    if (this.employee) {
      this.tabChange(this.employee.area);
      this.selectPosition();
      this.calculateAge();
    }

    this.formChanged.emit(this.form);
  }

  changerCountrys() {
    this.empleadoSv
      .getCountries()
      .then((data) => {
        this.countries = data;
      })
      .catch((err) => console.error(err));
  }

  tabChange(tabSelect: any) {
    this.tab = tabSelect;
    this.commissionStatus = false;

    this.form.get('area')?.setValue(this.tab);

    if (this.tab === 'Administrativa') {
      this.positionArray = [
        { name: 'Fundador y CEO' },
        { name: 'Recurso Humanos' },
      ];
    } else {
      this.positionArray = [{ name: 'Diseñador' }, { name: 'Programador' }];
    }
  }

  selectPosition() {
    if (this.form.get('position')?.value == 'Fundador y CEO') {
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
}
