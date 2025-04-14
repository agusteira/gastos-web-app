import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, NgModuleFactory, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-cuenta',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './agregar-cuenta.component.html',
  styleUrl: './agregar-cuenta.component.scss'
})
export class AgregarCuentaComponent {
  @Output() addExpense = new EventEmitter<any>();  // EventEmitter para enviar los datos
  @Output() closeModalEvent = new EventEmitter<void>();  // Evento para cerrar el modal en el componente padre
  
    nuevaCuenta = {
      nombre: '',
      tipo: '',
      moneda: 'ARS',
    };
  
    categories = ['Debito', 'Credito', 'Efectivo'];  // Ejemplo de categorías
    currencies = ['ARS', 'USD'];  // Ejemplo de categorías
  
    onSubmit() {
      if (!(this.nuevaCuenta.nombre && this.nuevaCuenta.tipo  && this.nuevaCuenta.moneda )){
        return
      }
      this.addExpense.emit(this.nuevaCuenta);  // Emitir los datos del nuevo gasto
      this.closeModal();  // Cerrar el modal después de agregar
      this.resetForm(); // Opcional: Limpia el formulario después de enviar
    }
  
    resetForm() {
      this.nuevaCuenta = {
          nombre: '',
          tipo: '',
          moneda: 'ARS',
      };
    }
  
    closeModal() {
      this.closeModalEvent.emit();
    }
}
