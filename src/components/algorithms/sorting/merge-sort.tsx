'use client'

import {useEffect, useState} from "react";
import {getRandomNumber, SortingState} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import "@/styles/merge-sort.css";

interface MergeSortState {
  start: number,
  end: number,
  level: number,
  array: number[],
  state: "merge" | "split",
  partition: "left" | "right"
}

const levelState: number[] = [0, 2, 4, 6];

function Box({value, color, bgColor, transform = '', animation = ''}: {value: number | string; color: string, bgColor: string, transform: string, animation: string}) {
  return (
    <div
      className={`rounded-md flex items-center justify-center ${typeof value == "string" ? "" : "shadow-lg"} ${bgColor} ${color}`}
      style={{
        height: '40px',
        width: '40px',
        transition: "all ease-in-out 0.4s",
        transform: transform,
        animation: `${animation} 0.4s ease-in-out`
      }}
    >{value}</div>
  )
}

export default function MergeSort() {
  const [arr, setArr] = useState<number[]>([]);
  const [grid, setGrid] = useState<JSX.Element[][]>([]);
  const [states, setStates] = useState<MergeSortState[]>([]);
  const [sortState, setSortState] = useState<SortingState>(SortingState.NOT_SORTED);

  const generateArray = () => {
    const n = getRandomNumber(8, 8);
    const tmpArr: number[] = [];
    for (let i = 0; i < n; i++) {
      tmpArr.push(getRandomNumber(100, 1));
    }
    setArr(tmpArr.slice());
  };

  const mergeSort = (
    start: number,
    end: number,
    level: number = 0,
    initial: number = 0,
    partition: 'right' | 'left' = 'left',
    l: number = 0,
    r: number = 7,
  ): number[] => {
    const tmp: number[] = arr.slice(initial, initial + end - start + 1);
    states.push({
      start: start,
      end: end,
      level: level,
      partition: partition,
      array: tmp,
      state: "split"
    });

    if (start >= end) {
      states.push({
        start: start,
        end: end,
        level: level,
        partition: partition,
        array: [arr[l]],
        state: "merge"
      });
      return [arr[l]];
    }

    let mid = (end - start + 1) / 2;
    let m = l + Math.floor((r - l) / 2);
    const ml:number[] = mergeSort(start - mid, start - 1, level + 1, initial, 'left', l, m);
    const mr: number[] = mergeSort(end + 1, end + mid, level + 1, initial + mid, 'right', m + 1, r);

    let mergeArr: number[] = [];
    let a = 0, b = 0;
    while (a < ml.length && b < mr.length) {
      if (ml[a] <= mr[b]) {
        mergeArr.push(ml[a]);
        ++a;
      } else {
        mergeArr.push(mr[b]);
        ++b;
      }
    }
    while (a < ml.length) {
      mergeArr.push(ml[a]);
      ++a;
    }
    while (b < mr.length) {
      mergeArr.push(mr[b]);
      ++b;
    }

    const sortedTmp = mergeArr.slice();
    states.push({
      start: start,
      end: end,
      level: level,
      partition: partition,
      array: sortedTmp,
      state: "merge"
    });

    return sortedTmp;
  };

  const reset = () => {
    const n = 22;
    const tmpGrid: JSX.Element[][] = [];
    for (let i = 0; i < 7; i++) {
      tmpGrid.push(new Array(n).fill(<Box value={''} color={''} bgColor={''} transform={''} animation={''}/>))
    }
    setGrid(tmpGrid.slice());
    generateArray();
    setSortState(SortingState.NOT_SORTED);
  };

  useEffect(() => {
    reset();
  }, []);

  const applyState = (state: MergeSortState) => {
    const tmpGrid = grid.slice();
    for (let i = state.start, j = 0; i <= state.end; ++i, ++j) {
      tmpGrid[levelState[state.level]][i] = <Box
        value={state.array[j]}
        color={'text-white'}
        transform={''}
        animation={state.level != 0 ? state.partition == 'left' ? 'splitAnimationLeft' : 'splitAnimationRight' : 'dropAnimation'}
        bgColor={state.state == "merge" ? 'bg-purple-600 font-bold' : 'bg-slate-800'}/>

      if (state.state == 'merge' && state.start != state.end) {
        // remove child nodes
        const mid = (state.end - state.start + 1) / 2;

        const left_child_start = state.start - mid;
        const left_child_end = state.start - 1;
        const right_child_start = state.end + 1;
        const right_child_end = state.end + mid;

        for (let j = left_child_start; j <= left_child_end; ++j) {
          tmpGrid[levelState[state.level + 1]][j] = <Box value={''} color={''} bgColor={''} transform={''} animation={'mergeAnimationLeft'}/>
        }
        for (let j = right_child_start; j <= right_child_end; ++j) {
          tmpGrid[levelState[state.level + 1]][j] = <Box value={''} color={''} bgColor={''} transform={''} animation={'mergeAnimationRight'}/>
        }
      }
    }

    setGrid(tmpGrid.slice());
  };

  const applySort = async () => {
    setSortState(SortingState.STARTED);

    setStates([]);
    mergeSort(7, 14);

    for (let i = 0; i < states.length; ++i) {
      applyState(states[i]);

      let ms = 650;
      if (i + 2 >= states.length) {
        ms = 900;
      }
      await new Promise(resolve => setTimeout(resolve, ms));
    }

    setSortState(SortingState.SORTED);
  };

  return (
    <div className={'flex flex-col items-center'}>
      <div className={'flex items-center gap-x-1'}>
        {
          arr.map((value: number, index: number) => (
            <div key={index}
                 className={'text-white flex items-center justify-center bg-purple-700 w-[40px] h-[40px]'}>{value}</div>
          ))
        }
      </div>

      <div className={'p-4 space-y-0.5 text-primary w-full flex justify-center border-2'}>
        <div>
          {
            grid.map((row, index) => (
              <div key={index} className={'flex items-center space-x-0.5'}>
                {row.map((value, idx) => (
                  <div key={idx}>{value}</div>
                ))}
              </div>
            ))
          }
        </div>
      </div>

      <div className={'flex items-center my-4'}>
        <Button
          onClick={applySort}
          disabled={sortState == SortingState.SORTED || sortState == SortingState.STARTED}
          className={'rounded-r-none'}>Sort</Button>
        <Button
          onClick={reset}
          variant={'secondary'}
          disabled={sortState == SortingState.STARTED}
          className={'rounded-l-none'}>Reset</Button>
      </div>
    </div>
  )
}