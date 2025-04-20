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
  mesSeleccionado: number = new Date().getMonth(); // 0 = enero
  anioSeleccionado: number = new Date().getFullYear();
  newExpense = {
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    categoria: '',
    moneda: 'ARS',
    monto: 0,
    TipoTransaccion: "",
    cuenta: "",
    flag: "create",
    id: 0
  };

  async ngOnInit() {
    await this.cargarGastos()
  }

  constructor(private gastosService: GastosService){
    
  }
  isSpecificMonth(fecha: Date | string, mes: number, anio: number): boolean {
    const expenseDate = new Date(fecha);
  
    return (
      expenseDate.getMonth() === mes &&
      expenseDate.getFullYear() === anio
    );
  }
  get expenseSummary(): Gasto[] {
    return this.expenses
      .filter(expense => this.isSpecificMonth(expense.fecha, this.mesSeleccionado, this.anioSeleccionado)) // Filtramos solo los gastos del mes actual
  }

  
  cambiarMes(direccion: number) {
    this.mesSeleccionado += direccion;

    if (this.mesSeleccionado < 0) {
      this.mesSeleccionado = 11;
      this.anioSeleccionado--;
    } else if (this.mesSeleccionado > 11) {
      this.mesSeleccionado = 0;
      this.anioSeleccionado++;
    }
  }

  obtenerNombreMes(mes: number): string {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return nombresMeses[mes];
  }
  

  abrirModal(){
    this.modalGastos = true;
  }

  //=========CRUD GASTOS============= 

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

  editarGasto(gastoEditado: any){
    console.log("updateando gasto")
    delete gastoEditado.flag
    this.gastosService.updateGasto(gastoEditado).subscribe(
      (gastoCreado) => {
        this.cargarGastos();
      },
      (error) => {
        console.error('Error al crear un gasto', error);
      }
    );
  }

  updateExpense(gasto:Gasto){
    this.newExpense = {
      fecha: new Date(gasto.fecha).toISOString().split('T')[0],
      descripcion: gasto.descripcion,
      categoria: gasto.categoria,
      moneda:gasto.moneda,
      monto: gasto.monto,
      TipoTransaccion: gasto.TipoTransaccion,
      cuenta: gasto.cuenta,
      flag: "update",
      id: gasto.id
    };
    this.abrirModal()
  }

  //====================== 
}
