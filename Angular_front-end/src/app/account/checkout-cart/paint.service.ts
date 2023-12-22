import { Injectable } from '@angular/core';


/*
  This service is based on the code from WPO8 of the course 
*/

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

  getImageData(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL();
  }

  private handleMouseDown(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    this.isDragging = true;
    this.context.beginPath();
    this.context.moveTo(mouseX, mouseY);
  }
  
  private handleMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const rect = (event.currentTarget as HTMLCanvasElement).getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      this.context.lineTo(mouseX, mouseY);
      this.context.strokeStyle = this.color;
      this.context.stroke();
    }
  }

  private handleMouseUp(): void {
    this.isDragging = false;
  }
}
