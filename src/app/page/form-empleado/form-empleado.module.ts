import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadoModule } from './components/empleado.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormEmpleadoRoutingModule } from './form-empleado-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormEmpleadoComponent } from './form-empleado.component';

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
