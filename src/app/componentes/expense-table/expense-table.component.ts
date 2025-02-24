import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [MatCardModule, MatIconModule,NgClass,
            CurrencyPipe, CommonModule,
            DatePipe],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
  animations: [
    trigger('tableAnimation', [
      transition(':enter', [
        query('mat-row', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class ExpenseTableComponent {
  @Input() expenses: any[] = [];
  displayedColumns: string[] = ['date', 'description', 'category', 'amount'];
}
