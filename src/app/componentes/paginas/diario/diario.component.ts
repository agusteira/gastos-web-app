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

    get categories(): string[]{
      const categories = [
        ...new Set(
          this.expenses
            .map(e => e.categoria)
            .filter(c => c && c.trim() !== '')
        )
      ];
      return categories
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

  editarGasto(gastoEditado: any){
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
}
