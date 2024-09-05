import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrudListServices } from '../../services/crud.service';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './crud-form.component.html',
  styleUrl: './crud-form.component.scss',
})
export class CrudFormComponent {
  daysOfWeek = [
    { name: 'Segunda-feira' },
    { name: 'Terça-feira' },
    { name: 'Quarta-feira' },
    { name: 'Quinta-feira' },
    { name: 'Sexta-feira' },
    { name: 'Sábado' },
    { name: 'Domingo' },
  ];

  specialties = [
    { especialidade: 'Pediatria' },
    { especialidade: 'Ginecologia' },
    { especialidade: 'Obstetrícia' },
    { especialidade: 'Neonatologia' },
    { especialidade: 'Endocrinologia Pediátrica' },
    { especialidade: 'Nutrição Infantil' },
    { especialidade: 'Genética Pediátrica' },
    { especialidade: 'Alergologia Pediátrica' },
  ];

  form: FormGroup = new FormGroup({});
  employeeId: string | null = null;
  isReadOnly = false;
  constructor(
    private router: Router,
    private crudServices: CrudListServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('mode') === 'view') {
      this.isReadOnly = true;
    }
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      specialty: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      hiringDate: new FormControl('', [Validators.required]),
      startAttendance: new FormControl('', [Validators.required]),
      endAttendance: new FormControl('', [Validators.required]),
      actions: new FormControl([], [Validators.required]),
    });

    this.employeeId = this.route.snapshot.paramMap.get('id');

    if (this.employeeId) {
      this.crudServices
        .getEmployee(this.employeeId)
        .subscribe((employee: any) => {
          this.form.patchValue(employee.data);
          this.form.get('status')?.setValue(employee.data.status);
          this.form.get('actions')?.setValue(employee.data.actions || []);
        });
    }
  }
  onCheckboxChange(event: MatCheckboxChange, day: string) {
    const days = this.form.get('actions')?.value as string[];
    if (event.checked) {
      days.push(day);
    } else {
      const index = days.indexOf(day);
      if (index > -1) {
        days.splice(index, 1);
      }
    }
    this.form.get('actions')?.setValue(days);
  }

  isDaySelected(day: string): boolean {
    return this.form.get('actions')?.value.includes(day);
  }

  isActiveSelected(status: boolean): boolean {
    if (this.form.get('status')?.value === status) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    if (this.isReadOnly) return;
    if (this.form && this.form.valid) {
      const formData = this.form.value;
      if (this.employeeId) {
        this.crudServices.updateEmployee(this.employeeId, formData).subscribe({
          next: (response) => {
            console.log('Atualização concluída com sucesso!', response);
            this.router.navigate(['/crud-list']);
          },
          error: (error) => {
            console.error('Erro ao atualizar o profissional', error);
          },
          complete: () => {
            console.log('Subscription complete');
          },
        });
      } else {
        this.crudServices.createEmployee(formData).subscribe({
          next: (response) => {
            console.log('Cadastro realizado com sucesso!', response);
            this.router.navigate(['/crud-list']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar o profissional', error);
          },
          complete: () => {
            console.log('Subscription complete');
          },
        });
      }
    } else {
      console.error('Formulário inválido!');
    }
  }
}
