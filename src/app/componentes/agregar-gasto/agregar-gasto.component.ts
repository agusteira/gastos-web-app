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
    date: '',
    description: '',
    category: '',
    currency: '',
    amount: 0,

  };

  categories = ['Comida', 'Transporte', 'Ropa', 'Salud', 'Varios'];  // Ejemplo de categorías
  currencies = ['ARS', 'USD'];  // Ejemplo de categorías

  onSubmit() {
    if (this.newExpense.date && this.newExpense.description && this.newExpense.category && this.newExpense.amount) {
      this.addExpense.emit(this.newExpense);  // Emitir los datos del nuevo gasto
      this.closeModal();  // Cerrar el modal después de agregar
    }
  }

  closeModal() {
    this.closeModalEvent.emit();}
}
