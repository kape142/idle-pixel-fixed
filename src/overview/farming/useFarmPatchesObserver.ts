import {
  useItemObserver,
  useNumberItemObserver,
} from "../setItems/useSetItemsObserver";

interface farmPatch {
  stage: number;
  setStage: (newValue: number) => void;
  seed: string;
  setSeed: (newValue: string) => void;
  timer: number;
  setTimer: (newValue: number) => void;
}

export const useFarmPatchesObserver = (id: string): farmPatch[] => {
  const hookId = `useFarmPatchesObserver-${id}`;
  const [stage1, setStage1] = useNumberItemObserver(`farm_stage_1`, hookId);
  const [stage2, setStage2] = useNumberItemObserver(`farm_stage_2`, hookId);
  const [stage3, setStage3] = useNumberItemObserver(`farm_stage_3`, hookId);
  const [stage4, setStage4] = useNumberItemObserver(`farm_stage_4`, hookId);
  const [stage5, setStage5] = useNumberItemObserver(`farm_stage_5`, hookId);

  const [seed1, setSeed1] = useItemObserver(`farm_1`, hookId);
  const [seed2, setSeed2] = useItemObserver(`farm_2`, hookId);
  const [seed3, setSeed3] = useItemObserver(`farm_3`, hookId);
  const [seed4, setSeed4] = useItemObserver(`farm_4`, hookId);
  const [seed5, setSeed5] = useItemObserver(`farm_5`, hookId);

  const [timer1, setTimer1] = useNumberItemObserver(`farm_timer_1`, hookId);
  const [timer2, setTimer2] = useNumberItemObserver(`farm_timer_2`, hookId);
  const [timer3, setTimer3] = useNumberItemObserver(`farm_timer_3`, hookId);
  const [timer4, setTimer4] = useNumberItemObserver(`farm_timer_4`, hookId);
  const [timer5, setTimer5] = useNumberItemObserver(`farm_timer_5`, hookId);

  return [
    {
      stage: stage1,
      setStage: setStage1,
      seed: seed1,
      setSeed: setSeed1,
      timer: timer1,
      setTimer: setTimer1,
    },
    {
      stage: stage2,
      setStage: setStage2,
      seed: seed2,
      setSeed: setSeed2,
      timer: timer2,
      setTimer: setTimer2,
    },
    {
      stage: stage3,
      setStage: setStage3,
      seed: seed3,
      setSeed: setSeed3,
      timer: timer3,
      setTimer: setTimer3,
    },
    {
      stage: stage4,
      setStage: setStage4,
      seed: seed4,
      setSeed: setSeed4,
      timer: timer4,
      setTimer: setTimer4,
    },
    {
      stage: stage5,
      setStage: setStage5,
      seed: seed5,
      setSeed: setSeed5,
      timer: timer5,
      setTimer: setTimer5,
    },
  ];
};
