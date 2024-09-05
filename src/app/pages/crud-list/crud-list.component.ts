import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CrudListServices } from '../../services/crud.service';
import { IEmployee } from '../../models/crud.models';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  imports: [
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  templateUrl: './crud-list.component.html',
  styleUrl: './crud-list.component.scss',
})
export class CrudListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'specialty',
    'crm',
    'phone',
    'status',
    'actions',
  ];
  logElementId(elementId: any) {
    console.log(elementId);
  }
  dataSource = new MatTableDataSource<IEmployee>([]);
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  constructor(private crudServices: CrudListServices, private router: Router) {
    this.getRegistredEmployees();
  }

  private findSpecialty(specialty: string) {
    switch (specialty) {
      case 'Pediatrics':
        return 'Pediatria';
      case 'Cardiology':
        return 'Cardiologia';
      case 'Dermatology':
        return 'Dermatologia';
      case 'Endocrinology':
        return 'Endocrinologia';
      case 'Gastroenterology':
        return 'Gastroenterologia';
      case 'Gynecology':
        return 'Ginecologia';
      case 'Obstetrics':
        return 'Obstetrícia';
      case 'Neonatology':
        return 'Neonatologia';
      case 'PediatricEndocrinology':
        return 'Endocrinologia Pediátrica';
      case 'ChildNutrition':
        return 'Nutrição Infantil';
      case 'PediatricGenetics':
        return 'Genética Pediátrica';
      case 'PediatricAllergy':
        return 'Aleitamento Pediátrico';
      default:
        return specialty;
    }
  }
  deleteEmployee(id: string): void {
    this.crudServices.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log('Exclusão concluída com sucesso!', response);
        this.router.navigate(['/crud-list']);
      },
      error: (error) => {
        console.error('Erro ao excluir o profissional', error);
      },
      complete: () => {
        console.log('Subscription complete');
      },
    });
  }
  getRegistredEmployees(page: number = 0, pageSize: number = 5) {
    this.crudServices.getEmployees().subscribe((response: any) => {
      this.dataSource.data = response.data.map((element: any) => ({
        ...element,
        specialty: this.findSpecialty(element.specialty),
      }));
      this.totalSize = response.total;
    });
  }
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getRegistredEmployees(this.currentPage, this.pageSize);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
