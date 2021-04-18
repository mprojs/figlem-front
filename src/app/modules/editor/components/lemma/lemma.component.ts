import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lemma, PointChangedEvent } from '../../../../models/editor.models';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'fl-lemma',
  templateUrl: './lemma.component.html',
  styleUrls: ['./lemma.component.scss']
})
export class LemmaComponent implements OnInit {
  @Input() lemmas: Lemma[] = [];
  @Output() lemmasChanged = new EventEmitter<Lemma[]>();

  activeLemmaIndex: number = null;

  constructor(private editorService: EditorService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.editorService.pointChanged$.subscribe({
      next: (data: PointChangedEvent) => {
        if (data.isNew) {
          this.lemmas.splice(this.activeLemmaIndex || this.lemmas.length - 1, 0, data.lemma);
          this.lemmasChanged.emit(this.lemmas);
          this.cd.detectChanges();
        }
      }
    });
  }

  onSelectedLemma(index: number, child?: number): void {
    if (child !== undefined) {
      this.lemmas[index].children[child].isActive = true;
    } else {
      this.lemmas[index].isActive = true;
    }
  }

  lossOfFocus(index: number, child?: number): void {
    if (child !== undefined) {
      this.lemmas[index].children[child].isActive = false;
    } else {
      this.lemmas[index].isActive = false;
    }
  }

  onDrag(e: any): void {
    const groupIndex = e.target.getAttribute('data-group-index');
    const childIndex = e.target.getAttribute('data-child-index');
    e.dataTransfer.setData('groupIndex', groupIndex);
    e.dataTransfer.setData('childIndex', childIndex);
  }

  drop(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    const srcGroupIndex = e.dataTransfer.getData('groupIndex');
    const srcChildIndex = e.dataTransfer.getData('childIndex');
    const dstGroupIndex = e.target.getAttribute('data-group-index');
    const dstChildIndex = e.target.getAttribute('data-child-index');
    console.log(srcGroupIndex, srcChildIndex, dstGroupIndex, dstChildIndex);
    if (!dstGroupIndex || dstGroupIndex === 'null') {
      console.log('No destingation ');
      return;
    }
    if (dstGroupIndex === 'main') {
      this.lemmas.push(this.lemmas[srcGroupIndex].children[srcChildIndex]);
      this.lemmas[srcGroupIndex].children.splice(srcChildIndex, 1);
      this.lemmas.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        }
        if (a.index < b.index) {
          return -1;
        }
        return 0;
      });
      return;
    }
    let srcLemma;
    const target = this.lemmas[dstGroupIndex];
    if (srcChildIndex !== 'null') {
      srcLemma = this.lemmas[srcGroupIndex].children.splice(srcChildIndex, 1)[0];
    } else {
      srcLemma = this.lemmas.splice(srcGroupIndex, 1)[0];
    }
    if (!target.children) {
      target.children = [];
    }
    target.children.push(srcLemma);

    if (e.target.className === 'list__item') {
      e.target.style.border = '1px solid rgb(122, 113, 238)';
    }
  }

  allowDrop(e: any): void {
    e.preventDefault();
    // if (e.target.className === 'list__item') {
    //   e.target.style.border = '1px solid rgb(122, 113, 238, 0.6)';
    // }
  }

  dragEnter(e: any): void {
    if (e.target.className === 'list__item') {
      e.target.style.border = '1px solid red';
    }
  }

  dragLeave(e: any): void {
    if (e.target.className === 'list__item') {
      e.target.style.border = '';
    }
  }

  onDeleteChild(i: number, j: number): void {
    this.lemmas[i].children.splice(j, 1);
  }

  onDeleteLemma(i: number): void {
    this.lemmas.splice(i, 1);
  }

  onAddGroup(): void {
    this.lemmas.push({
      index: 0,
      value: '',
      isGroup: true,
      isActive: true
    });
  }
}
