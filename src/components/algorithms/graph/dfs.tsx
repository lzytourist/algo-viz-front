'use client'

import {useEffect, useState} from "react";
import "@/styles/bfs.css";
import {Button} from "@/components/ui/button";
import {AlgoState, Box, dx, dy, RowCol, Stack} from "@/components/algorithms/graph/utils";

const ROW: number = 15;
const COL: number = 30;

export default function DFS() {
  const [grid, setGrid] = useState<Box[][]>([]);
  const [boxType, setBoxType] = useState<'start' | 'end' | 'empty' | 'wall'>('start');
  const [start, setStart] = useState<RowCol>({row: 0, col: 0});
  const [end, setEnd] = useState<RowCol>({row: -1, col: -1});
  const [algoState, setAlgState] = useState<AlgoState>(AlgoState.NOT_STARTED);

  const resetGrid = () => {
    const tmpGrid: Box[][] = [];
    for (let i = 0; i < ROW; i++) {
      const tmpRow: Box[] = [];
      for (let j = 0; j < COL; j++) {
        tmpRow.push({color: 'bg-secondary', type: 'empty'})
      }
      tmpGrid.push(tmpRow);
    }
    setGrid(tmpGrid);
    setBoxType('start');
    setEnd({row: -1, col: -1});
    setAlgState(AlgoState.NOT_STARTED);
  };

  useEffect(() => {
    resetGrid();
  }, []);

  const handleClick = (row: number, col: number) => {
    if (grid[row][col].type === 'empty') {
      setGrid((prevState) => {
        const newGrid = prevState.slice();
        newGrid[row][col] = {
          ...prevState[row][col],
          color: boxType === 'start' ? 'bg-green-500' : boxType === 'end' ? 'bg-orange-400' : 'bg-red-400',
          animation: 'clickAnimation 0.4s ease-in-out',
          type: boxType
        }
        return newGrid;
      });

      if (boxType == 'start') {
        setStart({row, col});
        setBoxType('end');
      } else if (boxType == 'end') {
        setEnd({row, col});
        setBoxType('wall');
      }
    }
  };

  const constructPath = async (path: RowCol[][]) => {
    let curr: RowCol = end;
    while (curr.row != start.row || curr.col != start.col) {
      setGrid((prevState) => {
        const newGrid = prevState.slice();
        newGrid[curr.row][curr.col] = {
          ...prevState[curr.row][curr.col],
          color: curr.row == end.row && curr.col == end.col ? 'bg-orange-800' : 'bg-yellow-400'
        }
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, 50));

      curr = path[curr.row][curr.col];
    }
  };

  const applyBFS = async () => {
    setAlgState(AlgoState.STARTED);

    const stk = new Stack();
    stk.push(start.row, start.col);

    const visited: boolean[][] = [];
    const path: RowCol[][] = [];
    for (let i = 0; i < ROW; i++) {
      const tmpVis: boolean[] = new Array(COL).fill(false);
      visited.push(tmpVis);

      const tmpPath: RowCol[] = new Array(COL).fill({row: -1, col: -1});
      path.push(tmpPath);
    }

    visited[start.row][start.col] = true;
    let found: boolean = false;

    while (!stk.isEmpty()) {
      const u = stk.pop();

      if (!((start.row == u.row && start.col == u.col) || (end.row == u.row && end.col == u.col))) {
        setGrid((prevState) => {
          const newGrid = prevState.slice();
          newGrid[u.row][u.col] = {
            ...prevState[u.row][u.col],
            color: 'bg-purple-500 shadow-md',
            animation: 'clickAnimation 0.3s ease-in-out'
          };
          return newGrid;
        });
      }

      if (u.row == end.row && u.col == end.col) {
        found = true;
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 50));

      for (let i = 0; i < 4; ++i) {
        const sx = dx[i] + u.row;
        const sy = dy[i] + u.col;

        if (sx >= 0 && sx < ROW && sy >= 0 && sy < COL && !visited[sx][sy] && grid[sx][sy].type != 'wall') {
          visited[sx][sy] = true;
          stk.push(sx, sy);
          path[sx][sy] = u;
        }
      }
    }

    if (found) {
      await constructPath(path);
    }

    setAlgState(AlgoState.COMPLETED);
  };

  return (
    <div className={'container my-8'}>
      <h1 className={'text-4xl mb-4'}>BFS</h1>
      <div>
        {
          grid.map((row: Box[], r_idx: number) => (
            <div key={r_idx} className={'flex items-center space-x-0.5 space-y-0.5'}>
              {
                row.map((col: Box, c_idx: number) => (
                  <div
                    onClick={() => handleClick(r_idx, c_idx)}
                    key={c_idx}
                    style={
                      col.animation ? {
                        animation: col.animation
                      } : {}
                    }
                    className={`${col.color} h-8 w-8`}></div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div className={'my-4 flex items-center justify-center'}>
        <Button
          onClick={applyBFS}
          disabled={end.row == -1 || algoState != AlgoState.NOT_STARTED}
          className={'rounded-r-none'}>Start</Button>
        <Button
          onClick={resetGrid}
          className={'rounded-l-none'}
          variant={'secondary'}>Reset</Button>
      </div>
    </div>
  )
}