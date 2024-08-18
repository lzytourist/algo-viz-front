'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {getRandomNumber} from "@/lib/utils";
import "@/styles/bubble-sort.css";

enum SortingState {
  NOT_SORTED,
  STARTED,
  SORTED
}

export default function BubbleSort() {
  const [arr, setArr] = useState<number[]>([]);
  const [swapIndex, setSwapIndex] = useState<number>(-2);
  const [comparisonIndex, setComparisonIndex] = useState<number>(-2);
  const [sortingState, setSortingState] = useState<SortingState>(SortingState.NOT_SORTED);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const n = getRandomNumber(15, 5);
    setArr(() => {
      return Array.from({length: n}, () => getRandomNumber(15, 3));
    });
    setSwapIndex(() => -2);
  };

  const reset = () => {
    setArr([]);
    setSortingState(SortingState.NOT_SORTED);
    setTimeout(() => generateArray(), 10);
  };

  const bubbleSort = async () => {
    setSortingState(SortingState.STARTED);
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparisonIndex(j);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (arr[j] > arr[j + 1]) {
          setSwapIndex(j + 1);
          setComparisonIndex(-2);

          arr[j] = [arr[j + 1], arr[j + 1] = arr[j]][0];

          await new Promise((resolve) => setTimeout(resolve, 700));
          setSwapIndex(n + 5);
        }
      }
      setComparisonIndex(-2);
    }
    setSortingState(SortingState.SORTED);
  };


  return (
    <div className={'flex flex-col items-center'}>
      <div className={'w-full min-h-[350px] text-white border-2 border-dashed flex justify-center items-end'}>
        {arr.map((value, index) => (
          <Bar
            key={index}
            value={value}
            animation={
              swapIndex == index ? 'swapLeftAnimation' :
                swapIndex == index + 1 ? 'swapRightAnimation' :
                  swapIndex == -2 ? 'initialAnimation' : ''
            }
            color={
              swapIndex == index ? 'bg-red-600' :
                comparisonIndex == index ? 'bg-red-600' :
                  comparisonIndex == index - 1 ? 'bg-orange-600' : 'bg-purple-600'
            }/>
        ))}
      </div>
      <div className={'py-6'}>
        <Button
          onClick={bubbleSort}
          disabled={sortingState == SortingState.SORTED || sortingState == SortingState.STARTED}
          className={'rounded-r-none'}
        >Sort</Button>
        <Button
          onClick={reset}
          disabled={sortingState == SortingState.STARTED}
          variant={'secondary'}
          className={'rounded-l-none'}
        >Generate array</Button>
      </div>
    </div>
  )
}

function Bar({value, animation, color}: { value: number; animation: string, color: string }) {
  return (
    <div
      className={`w-[30px] mx-2 text-center shadow-md ${color}`}
      style={{
        animation: `${animation} 0.5s ease-in-out`,
        height: `${value * 22}px`,
        transition: 'background-color 0.4s ease-in-out'
      }}
    >{value}</div>
  )
}