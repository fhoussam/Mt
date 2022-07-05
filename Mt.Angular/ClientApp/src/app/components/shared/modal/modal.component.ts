import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

    @Input() title: string;
    @Output() dismiss = new EventEmitter<void>();

    onDismiss() {
        this.dismiss.emit();
    }
}
