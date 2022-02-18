import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoModule } from './components/empleado.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormEmpleadoRoutingModule } from './form-empleado-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormEmpleadoComponent } from './form-empleado.component';
import { FiltroEmpleadoPipe } from './filtro-empleado.pipe';

@NgModule({
  declarations: [FormEmpleadoComponent, FiltroEmpleadoPipe],
  imports: [
    CommonModule,
    FormEmpleadoRoutingModule,
    EmpleadoModule,
    DataTablesModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class FormEmpleadoModule {}
