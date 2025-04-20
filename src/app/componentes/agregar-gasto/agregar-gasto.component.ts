import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, NgModuleFactory, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cuenta, CuentasService } from '../../servicios/cuentas.service';
import { Gasto } from '../../servicios/gastos.service';

@Component({
  selector: 'app-agregar-gasto',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './agregar-gasto.component.html',
  styleUrl: './agregar-gasto.component.scss'
})
export class AgregarGastoComponent {
  @Output() addExpense = new EventEmitter<any>();  // EventEmitter para enviar los datos
  @Output() updateExpense = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<any>();  // Evento para cerrar el modal en el componente padre
  @Input() newExpense: any;

  constructor(private cuentasService: CuentasService){}

  async ngOnInit() {
    
    await this.cargarCuentas()
  }


  /*newExpense = {
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    categoria: '',
    moneda: 'ARS',
    monto: 0,
    TipoTransaccion: "",
    cuenta: ""
  };*/

  categories = ['Comida', 'Transporte', 'Ropa', 'Salud', 'Varios'];  // Ejemplo de categorías
  currencies = ['ARS', 'USD'];  // Ejemplo de categorías
  cuentas: Cuenta[] = []
  cuentasVisibles: Cuenta[] = []
  cuentaPrecargada: any;

  onSubmit() {
    if (!(this.newExpense.fecha && this.newExpense.descripcion  && this.newExpense.monto  && this.newExpense.TipoTransaccion && this.newExpense.cuenta)){
      return
    }
    if(this.newExpense.TipoTransaccion == 'gasto' && !this.newExpense.categoria){
      return
    }
    if(this.newExpense.flag == "create"){
      this.addExpense.emit(this.newExpense);
    }else if(this.newExpense.flag == "update"){
      this.updateExpense.emit(this.newExpense);
    }
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
      TipoTransaccion: "",
      cuenta: "",
      flag: "create"
    };
  }

  closeModal() {
    this.resetForm()
    this.closeModalEvent.emit(this.newExpense);
  }

  cargarCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        this.cuentas = data;
        this.cuentasVisibles = this.cuentas.filter(({ moneda }) => moneda === this.newExpense.moneda);
      },
      (error) => {
        console.error('Error al cargar los gastos', error);
      }
    );
  }


  filtrarCuentas(): void {
    this.cuentasVisibles = this.cuentas.filter(({ moneda }) => moneda === this.newExpense.moneda);

  }

  //Cuando haya una moneda elegida -> Traer todas las cuentas saldo que tiene para esa moneda 
}
