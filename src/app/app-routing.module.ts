import { ViewEmpleadoComponent } from './page/form-empleado/components/view-empleado/view-empleado.component';
import { UpdateEmpleadoComponent } from './page/form-empleado/components/update-empleado/update-empleado.component';
import { CrearEmpleadoComponent } from './page/form-empleado/components/crear-empleado/crear-empleado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page/form-empleado/form-empleado.module').then(
        (m) => m.FormEmpleadoModule
      ),
  },
  {
    path: 'create-employee',
    component: CrearEmpleadoComponent,
  },
  {
    path: 'update-employee/:key',
    component: UpdateEmpleadoComponent,
  },
  {
    path: 'view-employee',
    component: ViewEmpleadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
