import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appCheckmark]',
})
export class CheckmarkDirective implements OnInit {
  @Input() color!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Marcar el primer elemento como checked al inicio
    if (
      this.el.nativeElement.parentElement.firstChild === this.el.nativeElement
    ) {
      this.addCheckmark();
    }
  }

  @HostListener('click') onClick() {
    // Desmarcar otros elementos
    Array.from(this.el.nativeElement.parentElement.children).forEach(
      (child: any) => {
        this.renderer.removeClass(child, 'checked');
        const checkmarkIcon = child.querySelector('.check-icon');
        if (checkmarkIcon) {
          child.removeChild(checkmarkIcon);
        }
      }
    );
    // Marcar este elemento
    this.addCheckmark();
  }

  private addCheckmark() {
    if (!this.el.nativeElement.classList.contains('checked')) {
      const checkmarkIcon = this.renderer.createElement('ion-icon');
      this.renderer.setAttribute(checkmarkIcon, 'name', 'checkmark-outline');
      this.renderer.addClass(checkmarkIcon, 'check-icon');
      this.renderer.appendChild(this.el.nativeElement, checkmarkIcon);
      this.renderer.addClass(this.el.nativeElement, 'checked');
    }
  }
}
