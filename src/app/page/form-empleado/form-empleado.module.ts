import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpleadoModule } from './../components/empleado.module';
import { FormEmpleadoRoutingModule } from './form-empleado-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmpleadoComponent } from './form-empleado.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [FormEmpleadoComponent],
  imports: [
    CommonModule,
    FormEmpleadoRoutingModule,
    EmpleadoModule,
    DataTablesModule,
    FontAwesomeModule,
  ],
})
export class FormEmpleadoModule {}
