import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AgregarGastoComponent } from "../../agregar-gasto/agregar-gasto.component";
import { ExpenseTableComponent } from "../../expense-table/expense-table.component";
import { Gasto, GastosService } from '../../../servicios/gastos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diario',
  standalone: true,
  imports: [NavbarComponent, AgregarGastoComponent, ExpenseTableComponent, CommonModule],
  templateUrl: './diario.component.html',
  styleUrl: './diario.component.scss'
})
export class DiarioComponent  implements OnInit{
  modalGastos = false;
  expenses: Gasto[] = [];

  constructor(private gastosService: GastosService){
      
    }

  abrirModal(){
    this.modalGastos = true;
  }

  async ngOnInit() {
    await this.cargarGastos()
  }

  cargarGastos(): void {
    this.gastosService.getGastos().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.expenses = data;
        this.expenses = this.expenses
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
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
