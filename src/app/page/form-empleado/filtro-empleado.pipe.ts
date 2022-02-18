import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleado',
})
export class FiltroEmpleadoPipe implements PipeTransform {
  transform(value: any, str: string, args: string): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((data: any) =>
      data[str].toLowerCase().includes(args.toLowerCase())
    );
  }
}
