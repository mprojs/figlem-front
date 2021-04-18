export interface Lemma {
  index: number;
  value: string;
  isGroup: boolean;
  offsetX?: number;
  offsetY?: number;
  groupOffsetX?: number;
  groupOffsetY?: number;
  children?: Lemma[];
  isActive?: boolean;
}

// export interface LemmasGroup {
//   value: string;
//   groupOffsetX?: number;
//   groupOffsetY?: number;
//   children: Lemma[];
//   isActive?: boolean;
// }

export interface Figure {
  id: number;
  projectId: number;
  title: string;
  imageUrl: string;
  imageId?: number;
  lemmas: Lemma[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PointChangedEvent {
  isNew: boolean;
  lemma: Lemma;
}
