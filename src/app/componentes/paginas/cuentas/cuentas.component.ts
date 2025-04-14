import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Cuenta, CuentasService } from '../../../servicios/cuentas.service';
import { AgregarCuentaComponent } from "../../agregar-cuenta/agregar-cuenta.component";
import { Gasto, GastosService } from '../../../servicios/gastos.service';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [NavbarComponent,
    MatCardModule,
    MatIconModule,
    CurrencyPipe,
    CommonModule, AgregarCuentaComponent],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent {
  cuentas: Cuenta[] = [];
  noDecimalCurrencies = ['ARS']
  display = 'symbol';
  modalCuentas = false;
  expenses: Gasto[] = [];

  constructor(private cuentasService: CuentasService, private gastosService: GastosService){}

  async ngOnInit() {
      await this.cargarCuentas()
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
  
  cargarCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); 
        this.cuentas = data;
      },
      (error) => {
        console.error('Error al cargar los gastos', error);
      }
    );
  }
  agregarCuenta(nuevaCuenta: Cuenta): void {
      this.cuentasService.createCuenta(nuevaCuenta).subscribe(
        (cuentaCreada) => {
          this.cargarCuentas();
        },
        (error) => {
          console.error('Error al crear un gasto', error);
        }
      );
  }

  cargarSaldo(nombreCuenta: string): number {
    return this.expenses
      .filter(({ cuenta }) => cuenta === nombreCuenta)
      .reduce((saldo, { TipoTransaccion, monto }) => {
        return TipoTransaccion === 'ingreso'
          ? saldo + monto
          : saldo - monto;
      }, 0);
  }
  

  getDecimalFormat(currency:string): string {
    return this.noDecimalCurrencies.includes(currency) ? '1.0-0' : '1.2-2';
  }

  abrirModal(){
    this.modalCuentas = true;
  }
}
