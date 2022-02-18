import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Employee } from 'src/app/Class/Employee';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-view-empleado',
  templateUrl: './view-empleado.component.html',
  styleUrls: ['./view-empleado.component.scss'],
})
export class ViewEmpleadoComponent implements OnInit {
  form!: FormGroup;
  data!: any;
  employee!: Employee;
  name!: string;

  constructor(private route: Router) {}

  ngOnInit(): void {
    let jsonData = localStorage.getItem('data');
    if (jsonData) {
      this.data = JSON.parse(jsonData);
      localStorage.removeItem('data');
      this.name = this.data.name;
    } else {
      this.route.navigate(['']);
    }
  }

  dataEmit(form: FormGroup) {
    this.form = form;
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.data = data;
    });
  }
}
