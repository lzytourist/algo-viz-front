export type Box = {
  color: string,
  type: 'start' | 'end' | 'wall' | 'empty',
  animation?: string
};

export type RowCol = {
  row: number,
  col: number
};

export enum AlgoState {
  NOT_STARTED,
  STARTED,
  COMPLETED
}

export class Queue {
  private frontIdx: number;
  private readonly items: RowCol[];

  constructor() {
    this.items = [];
    this.frontIdx = 0
  }

  push(row: number, col: number) {
    this.items.push({row, col});
  }

  isEmpty(): boolean {
    return this.items.length - this.frontIdx <= 0;
  }

  front() {
    return this.items[this.frontIdx];
  }

  pop() {
    this.frontIdx++;
  }
}

export const dx: number[] = [0, 0, 1, -1];
export const dy: number[] = [1, -1, 0, 0];