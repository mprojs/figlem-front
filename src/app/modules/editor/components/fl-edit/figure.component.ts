import { Component, Input, OnInit } from '@angular/core';
import { Figure } from '../../../../models/editor.models';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'fl-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss']
})
export class FigureComponent implements OnInit {
  @Input() figure: Figure;
  file: string;
  apiUrl: string;
  lemmas = [];

  constructor(private editorService: EditorService) {}

  ngOnInit(): void {}

  onEventClickImage(e: MouseEvent, image: HTMLElement): void {
    const x = e.offsetX / image.clientWidth;
    const y = e.offsetY / image.clientHeight;
    this.editorService.addPoint(x * 100, y * 100);
  }
}
