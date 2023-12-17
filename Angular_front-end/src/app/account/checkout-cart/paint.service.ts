import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class PaintService {
  private isDragging = false;
  private color = '#000000';
  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  initializeCanvas(canvas: HTMLCanvasElement): void {
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  clearCanvas(): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  setColor(newColor: string): void {
    this.color = newColor;
  }

  private handleMouseDown(event: MouseEvent): void {
    const mouseX = event.pageX - (event.currentTarget as any)['offsetLeft'];
    const mouseY = event.pageY - (event.currentTarget as any)['offsetTop'] - 100;
    this.isDragging = true;
    this.context.beginPath();
    this.context.moveTo(mouseX, mouseY);
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const mouseX = event.pageX - (event.currentTarget as any)['offsetLeft'];
      const mouseY = event.pageY - (event.currentTarget as any)['offsetTop'] - 100;
      this.context.lineTo(mouseX, mouseY);
      this.context.strokeStyle = this.color;
      this.context.stroke();
    }
  }

  private handleMouseUp(): void {
    this.isDragging = false;
  }
}
