import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateEmpleadoComponent, CrearEmpleadoComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmpleadoModule {}
