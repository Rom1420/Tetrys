import { Injectable } from '@angular/core';
import { TetrisBlockId, TetrisBlocks } from '../mock/block.mock';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private blocks: { id: number, shape: boolean[][] }[] = [];

  constructor() {
    this.initializeBlocks();
  }

  private initializeBlocks(): void {
    (Object.keys(TetrisBlocks) as (keyof typeof TetrisBlocks)[]).forEach((blockType) => {
      const id = TetrisBlockId[blockType];
      const shape = TetrisBlocks[blockType];
      this.blocks.push({ id, shape });
    });       
  }

  getBlocks(): { id: number, shape: boolean[][] }[] {
    return this.blocks;
  }

  getBlockById(blockId: number): { id: number, shape: boolean[][] } | undefined {
    return this.blocks.find(block => block.id === blockId);
  }

  getThreeDistinctBlocks(): { id: number, shape: boolean[][] }[] {
    const blockTypes = Object.keys(TetrisBlocks) as (keyof typeof TetrisBlocks)[];
    const distinctBlocks: { id: number, shape: boolean[][] }[] = [];

    while (distinctBlocks.length < 3) {
      const randomBlockType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
      const id = TetrisBlockId[randomBlockType];
      const shape = TetrisBlocks[randomBlockType];
      if (!distinctBlocks.some(block => block.id === id)) {
        distinctBlocks.push({ id, shape });
      }
    }

    return distinctBlocks;
  }
}
