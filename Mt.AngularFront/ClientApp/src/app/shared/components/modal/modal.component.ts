import { Component, EventEmitter, Input, Output } from '@angular/core';

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
