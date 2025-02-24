import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ExpenseSummaryComponent } from "../expense-summary/expense-summary.component";
import { ExpenseTableComponent } from "../expense-table/expense-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ExpenseSummaryComponent, ExpenseTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  expenses = [
    { id: 1, date: '2023-06-01', description: 'Supermercado', amount: 85.50, category: 'Alimentación' },
    { id: 2, date: '2023-06-03', description: 'Gasolina', amount: 45.00, category: 'Transporte' },
    { id: 3, date: '2023-06-05', description: 'Restaurante', amount: 32.75, category: 'Ocio' },
    { id: 4, date: '2023-06-07', description: 'Cine', amount: 25.00, category: 'Entretenimiento' },
    { id: 5, date: '2023-06-10', description: 'Ropa', amount: 120.00, category: 'Compras' },
    { id: 6, date: '2023-06-12', description: 'Libros', amount: 50.00, category: 'Educación' },
    { id: 7, date: '2023-06-15', description: 'Electricidad', amount: 75.30, category: 'Servicios' },
    { id: 8, date: '2023-06-18', description: 'Internet', amount: 60.00, category: 'Servicios' },
    { id: 9, date: '2023-06-20', description: 'Gimnasio', amount: 40.00, category: 'Salud' },
    { id: 10, date: '2023-06-23', description: 'Teléfono', amount: 35.00, category: 'Servicios' },
  ];

  get totalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  get averageExpense(): number {
    return this.totalExpenses / this.expenses.length;
  }

  get highestExpense(): number {
    return Math.max(...this.expenses.map(expense => expense.amount));
  }

  get lowestExpense(): number {
    return Math.min(...this.expenses.map(expense => expense.amount));
  }
}
