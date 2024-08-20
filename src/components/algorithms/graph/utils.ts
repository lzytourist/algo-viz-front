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

export const dx: number[] = [0, 0, 1, -1, 1, -1, -1, 1];
export const dy: number[] = [1, -1, 0, 0, 1, 1, -1, -1];

export type Node = {
  row: number,
  col: number,
  f: number
};

export type Cell = {
  f: number,
  g: number,
  h: number
};

export class PriorityQueue {
  private readonly items: Node[];

  constructor() {
    this.items = [];
  }

  push(node: Node) {
    // for (let i = 0; i < this.items.length; i++) {
    //   if (this.items[i].f > node.f) {
    //     this.items.splice(i, 0, node);
    //     return;
    //   }
    // }
    this.items.push(node);
    this.items.sort((a, b) => a.f - b.f);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  exists(node: Node): boolean {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].row == node.row && this.items[i].col == node.col) {
        return true;
      }
    }
    return false;
  }

  peek(): Node {
    return this.items.shift()!;
  }
}