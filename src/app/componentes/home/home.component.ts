import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ExpenseSummaryComponent } from "../expense-summary/expense-summary.component";
import { ExpenseTableComponent } from "../expense-table/expense-table.component";
import { CommonModule } from '@angular/common';
import { AgregarGastoComponent } from "../agregar-gasto/agregar-gasto.component";
import { Gasto, GastosService } from '../../servicios/gastos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ExpenseSummaryComponent, ExpenseTableComponent, CommonModule, AgregarGastoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  modalGastos = true;
  last10Expenses:  any[] = [];
  expenses: Gasto[] = [];

  async ngOnInit() {
    await this.cargarGastos()
  }

  constructor(private gastosService: GastosService){

  }

  get totalExpenses(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.monto, 0);
  }

  get averageExpense(): number {
    return this.totalExpenses / this.expenses.length;
  }

  get highestExpense(): number {
    return Math.max(...this.expenses.map(expense => expense.monto));
  }

  get lowestExpense(): number {
    return Math.min(...this.expenses.map(expense => expense.monto));
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
