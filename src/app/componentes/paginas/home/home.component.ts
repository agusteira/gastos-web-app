import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AgregarGastoComponent } from '../../agregar-gasto/agregar-gasto.component';
import { ExpenseTableComponent } from '../../expense-table/expense-table.component';
import { ExpenseSummaryComponent } from '../../expense-summary/expense-summary.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Gasto, GastosService } from '../../../servicios/gastos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ExpenseSummaryComponent, ExpenseTableComponent, CommonModule, AgregarGastoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  modalGastos = false;
  last10Expenses:  any[] = [];
  expenses: Gasto[] = [];

  async ngOnInit() {
    await this.cargarGastos()
  }

  constructor(private gastosService: GastosService){
    
  }

  // Verifica si la fecha del gasto es del mes actual
  isCurrentMonth(fecha: Date): boolean {
    const today = new Date();
    const expenseMonth = new Date(fecha).getMonth();
    const currentMonth = today.getMonth();
    const expenseYear = new Date(fecha).getFullYear();
    const currentYear = today.getFullYear();

    return expenseMonth === currentMonth && expenseYear === currentYear;
  }


  get totalExpenses(): number {
    return this.expenses
      .filter(expense => this.isCurrentMonth(expense.fecha)) // Filtramos solo los gastos del mes actual
      .filter(expense => expense.TipoTransaccion == "gasto")
      .reduce((sum, expense) => sum + expense.monto, 0);
  }
  
  get averageExpense(): number {
    const currentMonthExpenses = this.expenses.filter(expense => this.isCurrentMonth(expense.fecha)).filter(expense => expense.TipoTransaccion == "gasto");
    return currentMonthExpenses.length > 0
      ? this.totalExpenses / currentMonthExpenses.length
      : 0; // Evitar división por cero
  }
  
  get highestExpense(): number {
    const currentMonthExpenses = this.expenses.filter(expense => this.isCurrentMonth(expense.fecha)).filter(expense => expense.TipoTransaccion == "gasto");
    return currentMonthExpenses.length > 0
      ? Math.max(...currentMonthExpenses.map(expense => expense.monto))
      : 0; // Evitar error si no hay gastos del mes actual
  }
  
  get lowestExpense(): number {
    const currentMonthExpenses = this.expenses.filter(expense => this.isCurrentMonth(expense.fecha)).filter(expense => expense.TipoTransaccion == "gasto");
    return currentMonthExpenses.length > 0
      ? Math.min(...currentMonthExpenses.map(expense => expense.monto))
      : 0; // Evitar error si no hay gastos del mes actual
  }
  

  abrirModal(){
    this.modalGastos = true;
  }


  cargarGastos(): void {
    this.gastosService.getGastos().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // ✅ Verifica si llegan los datos
        this.expenses = data;
  
        // ✅ Solo ejecuta la ordenación cuando expenses ya tiene datos
        this.last10Expenses = this.expenses
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .slice(0, 10);
      },
      (error) => {
        console.error('Error al cargar los gastos', error);
      }
    );
  }
  
  agregarGasto(nuevoGasto: Gasto): void {
    //const nuevoGasto: Gasto = { descripcion: 'Nuevo gasto', monto: 100, fecha: new Date() , categoria: "", usuario: "", moneda: "ARS"};

    this.gastosService.createGasto(nuevoGasto).subscribe(
      (gastoCreado) => {
        this.cargarGastos();
      },
      (error) => {
        console.error('Error al crear un gasto', error);
      }
    );
  }

  // Método para eliminar un gasto
  eliminarGasto(id: number): void {
    this.gastosService.deleteGasto(id).subscribe(
      () => {
        this.expenses = this.expenses.filter((gasto) => gasto.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el gasto', error);
      }
    );
  }
}
