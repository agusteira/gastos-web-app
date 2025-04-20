import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from '@angular/material/table';
import { Gasto, GastosService } from '../../servicios/gastos.service';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [MatCardModule, MatIconModule,NgClass,
            CurrencyPipe, CommonModule,
            DatePipe],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
  animations: [
    trigger('tableAnimation', [
      transition(':enter', [
        query('mat-row', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class ExpenseTableComponent {
  @Input() expenses: any[] = [];
  @Output() updateEvent = new EventEmitter<Gasto>();
  noDecimalCurrencies = ['ARS']

  constructor(private gastosService: GastosService){
      
  }

  display = 'symbol'; // Puede ser 'code', 'symbol' o 'symbol-narrow'
  // Definir decimales según la moneda
  getDecimalFormat(currency:string): string {
    return this.noDecimalCurrencies.includes(currency) ? '1.0-0' : '1.2-2';
  }

 // Función que obtiene todos los meses, incluyendo aquellos con menos de 10 registros
  getMonths(expenses: any[]) {
    const months = expenses.map((expense) => this.getMonthString(expense.fecha));
    return [...new Set(months)];  // Devuelve los meses únicos
  }

  // Función que agrupa las expenses por mes
  getExpensesForMonth(month: string) {
    return this.expenses.filter(expense => this.getMonthString(expense.fecha) === month);
  }

  // Función que devuelve el nombre del mes
  getMonthString(date: string): string {
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    return month;
  }

  editarGasto(expense:Gasto){
    this.updateEvent.emit(expense);
  }

  eliminarGasto(expense:Gasto): void {
    this.gastosService.deleteGasto(expense.id).subscribe(
      () => {
        this.expenses = this.expenses.filter((gasto) => gasto.id !== expense.id);
      },
      (error) => {
        console.error('Error al eliminar el gasto', error);
      }
    );
  }
}
