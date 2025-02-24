import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('{{ delay }} ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ], { params: { delay: '500ms' } }) // Establece un valor por defecto
]);

@Component({
  standalone: true,
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
  imports: [
    MatCardModule,
    MatIconModule,
    CurrencyPipe,
    CommonModule
  ],
  animations:[fadeInUp] 
})
export class ExpenseSummaryComponent {
  @Input() totalExpenses: number = 0;
  @Input() averageExpense: number = 0;
  @Input() highestExpense: number = 0;
  @Input() lowestExpense: number = 0;
}
