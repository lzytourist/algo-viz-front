'use client'

import {useEffect, useState} from "react";
import {AlgoState, Box, dx, dy, Node, PriorityQueue, RowCol} from "@/components/algorithms/graph/utils";
import {Button} from "@/components/ui/button";
import "@/styles/bfs.css";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";

const ROW: number = 15;
const COL: number = 30;
const MAX: number = 10000000;

export default function AStar() {
  const [grid, setGrid] = useState<Box[][]>([]);
  const [boxType, setBoxType] = useState<'start' | 'end' | 'wall'>('start');
  const [start, setStart] = useState<RowCol>({row: 0, col: 0});
  const [end, setEnd] = useState<RowCol>({row: 0, col: 0});
  const [algoState, setAlgoState] = useState<AlgoState>(AlgoState.NOT_STARTED);
  const [speed, setSpeed] = useState<number>(350);
  const [diagonal, setDiagonal] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const resetGrid = () => {
    const tmpGrid: Box[][] = [];
    for (let i = 0; i < ROW; i++) {
      const tmpRow: Box[] = new Array(COL).fill({type: 'empty', color: 'bg-secondary'});
      tmpGrid.push(tmpRow);
    }
    setGrid(tmpGrid);
    setBoxType('start');
    setEnd({row: -1, col: -1});
    setAlgoState(AlgoState.NOT_STARTED);
    setMouseDown(false);
  };

  useEffect(() => {
    resetGrid();
  }, []);

  const handleClick = (row: number, col: number) => {
    if (grid[row][col].type === 'empty') {
      setGrid((prevState) => {
        const newGrid = prevState.slice();
        newGrid[row][col] = {
          ...newGrid[row][col],
          color: boxType === 'start' ? 'bg-emerald-400' : boxType === 'end' ? 'bg-yellow-400' : 'bg-red-600',
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

  const handleMouseMove = (row: number, col: number) => {
    if (mouseDown) {
      handleClick(row, col);
    }
  };

  const constructPath = async (path: RowCol[][]) => {
    let curr: RowCol = end;
    while (curr.row != start.row || curr.col != start.col) {
      setGrid((prevState) => {
        const newGrid = prevState.slice();
        newGrid[curr.row][curr.col] = {
          ...prevState[curr.row][curr.col],
          color: curr.row == end.row && curr.col == end.col ? 'bg-yellow-400' : 'bg-sky-300'
        }
        return newGrid;
      });
      await new Promise(resolve => setTimeout(resolve, 50));

      curr = path[curr.row][curr.col];
    }
  };

  const heuristic = (u: RowCol) => {
    // return Math.sqrt(Math.pow(u.row - end.row, 2) + Math.pow(u.col - end.col, 2));
    return Math.abs(u.row - end.row) + Math.abs(u.col - end.col);
  };

  const applyAStar = async () => {
    setAlgoState(AlgoState.STARTED);

    const gScore: number[][] = [];
    const fScore: number[][] = [];
    const path: RowCol[][] = [];

    for (let i = 0; i < ROW; i++) {
      const tmpG: number[] = new Array(COL).fill(MAX);
      gScore.push(tmpG);

      const tmpF: number[] = new Array(COL).fill(MAX);
      fScore.push(tmpF);

      const tmpPath = new Array(COL).fill({row: -1, col: -1});
      path.push(tmpPath);
    }

    const pq = new PriorityQueue();

    pq.push({...start, f: 0});
    gScore[start.row][start.col] = 0;
    fScore[start.row][start.col] = heuristic(start);
    path[start.row][start.col] = start;

    while (!pq.isEmpty()) {
      const u = pq.peek();

      if (!(u.row == start.row && u.col == start.col)) {
        setGrid((prevState) => {
          const newGrid = prevState.slice();
          newGrid[u.row][u.col] = {
            ...prevState[u.row][u.col],
            color: 'bg-slate-700',
            animation: 'clickAnimation 0.4s ease-out'
          }
          return newGrid;
        });
      }

      await new Promise(resolve => setTimeout(resolve, 400 - speed));

      if (u.row == end.row && u.col == end.col) {
        await constructPath(path);
        break;
      }

      for (let i = 0; i < (diagonal ? dx.length : 4); ++i) {
        const sx = dx[i] + u.row;
        const sy = dy[i] + u.col;

        if (sx >= 0 && sx < ROW && sy >= 0 && sy < COL && grid[sx][sy].type != 'wall') {
          const tentativeGScore = gScore[u.row][u.col] + 1;
          if (tentativeGScore < gScore[sx][sy]) {
            gScore[sx][sy] = tentativeGScore;
            fScore[sx][sy] = tentativeGScore + heuristic({row: sx, col: sy});
            path[sx][sy] = {row: u.row, col: u.col};

            const v: Node = {row: sx, col: sy, f: fScore[sx][sy]};

            if (!pq.exists(v)) {
              pq.push(v);
            }
          }
        }
      }
    }

    setAlgoState(AlgoState.COMPLETED);
  };

  return (
    <div className={'flex items-center flex-col gap-y-4'}>
      <div>
        <div className={'flex items-center gap-4'}>
          <div className={'flex items-center space-x-2'}>
            <Checkbox
              disabled={algoState == AlgoState.STARTED}
              checked={diagonal}
              onCheckedChange={() => setDiagonal(prevState => !prevState)}/>
            <h4>Diagonal search</h4>
          </div>
          <div className={'flex items-center space-x-2 min-w-72'}>
            <h4>Speed</h4>
            <Slider
              disabled={algoState == AlgoState.STARTED}
              onValueChange={val => setSpeed(val[0])}
              value={[speed]}
              max={400}
              step={1}
              min={0}/>
          </div>
        </div>
      </div>
      <div>
        {
          grid.map((row: Box[], r_idx: number) => (
            <div key={r_idx} className={'flex items-center space-x-0.5 space-y-0.5'}>
              {
                row.map((col: Box, c_idx: number) => (
                  <div
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseMove={() => handleMouseMove(r_idx, c_idx)}
                    onClick={() => handleClick(r_idx, c_idx)}
                    key={c_idx}
                    style={
                      col.animation ? {
                        animation: col.animation
                      } : {}
                    }
                    className={`${col.color} cursor-pointer h-8 w-8`}></div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div className={'flex items-center justify-center'}>
        <Button
          onClick={applyAStar}
          disabled={algoState == AlgoState.STARTED || algoState == AlgoState.COMPLETED || end.row == -1}
          className={'rounded-r-none'}>Start</Button>
        <Button
          onClick={resetGrid}
          disabled={algoState == AlgoState.STARTED}
          variant={'secondary'}
          className={'rounded-l-none'}>Reset</Button>
      </div>
    </div>
  )
}