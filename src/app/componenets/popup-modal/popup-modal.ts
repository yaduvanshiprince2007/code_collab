import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  imports: [],
  templateUrl: './popup-modal.html',
  styleUrl: './popup-modal.css',
})
export class PopupModal {
  isOpen = input<boolean>(false);

  title = input<string>('');

  // OUTPUT
  closed = output<boolean>();

  closeModal() {
    this.closed.emit(false);
  }
}
