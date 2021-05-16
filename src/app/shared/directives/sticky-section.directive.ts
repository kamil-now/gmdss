import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStickySection]'
})
export class StickySectionDirective {

  @Input() stickySectionTopMargin = '0px';

  private _element: HTMLElement;
  private _isSticky = false;
  private _offsetTop = 0;

  constructor(el: ElementRef) {
    this._element = el.nativeElement;
    this._offsetTop = this._element.offsetTop;

    document.addEventListener('scroll', () => {
      const docTop = this._getDocumentPosition();
      const offset = this._offsetTop;
      if (docTop > offset && !this._isSticky) {
        this._makeSticky();
        this._isSticky = true;
      } else {
        if (docTop < offset && this._isSticky) {
          this._resetSticky();
          this._isSticky = false;
        }
      }
    });
  }

  private _getDocumentPosition(): number {
    const docEl = document.documentElement;
    const docRect = docEl.getBoundingClientRect();

    const top = -docRect.top || document.body.scrollTop || window.scrollY || docEl.scrollTop || 0;

    return top;
  }

  private _makeSticky(): void {
    this._element.style.cssText += 'position: -webkit-sticky; position: sticky; ';
    this._element.style.top = this.stickySectionTopMargin;
  }

  private _resetSticky(): void {
    this._element.style.position = '';
    this._element.style.top = '';
  }
}
