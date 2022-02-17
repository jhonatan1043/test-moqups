import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEmpleadoComponent } from './page/components/crear-empleado/crear-empleado.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
