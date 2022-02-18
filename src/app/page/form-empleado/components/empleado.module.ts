import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataEmpleadoComponent } from './data-empleado/data-empleado.component';
import { ViewEmpleadoComponent } from './view-empleado/view-empleado.component';

@NgModule({
  declarations: [
    UpdateEmpleadoComponent,
    CrearEmpleadoComponent,
    DataEmpleadoComponent,
    ViewEmpleadoComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmpleadoModule {}
