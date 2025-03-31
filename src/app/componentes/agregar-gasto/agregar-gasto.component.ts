import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, NgModuleFactory, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-gasto',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './agregar-gasto.component.html',
  styleUrl: './agregar-gasto.component.scss'
})
export class AgregarGastoComponent {
  @Output() addExpense = new EventEmitter<any>();  // EventEmitter para enviar los datos
  @Output() closeModalEvent = new EventEmitter<void>();  // Evento para cerrar el modal en el componente padre

  newExpense = {
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    categoria: '',
    moneda: 'ARS',
    monto: 0,
    TipoTransaccion: ""
  };

  categories = ['Comida', 'Transporte', 'Ropa', 'Salud', 'Varios'];  // Ejemplo de categorías
  currencies = ['ARS', 'USD'];  // Ejemplo de categorías

  onSubmit() {
    if (!(this.newExpense.fecha && this.newExpense.descripcion  && this.newExpense.monto  && this.newExpense.TipoTransaccion)){
      return
    }
    if(this.newExpense.TipoTransaccion == 'gasto' && !this.newExpense.categoria){
      return
    }
    this.addExpense.emit(this.newExpense);  // Emitir los datos del nuevo gasto
    this.closeModal();  // Cerrar el modal después de agregar
    this.resetForm(); // Opcional: Limpia el formulario después de enviar
  }

  resetForm() {
    this.newExpense = {
      fecha: new Date().toISOString().split('T')[0],
      descripcion: '',
      categoria: '',
      moneda: 'ARS',
      monto: 0,
      TipoTransaccion: ""
    };
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  //Cuando haya una moneda elegida -> Traer todas las cuentas saldo que tiene para esa moneda 
}
