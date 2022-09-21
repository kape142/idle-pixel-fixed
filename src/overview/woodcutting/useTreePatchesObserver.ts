import {
  useItemObserver,
  useNumberItemObserver,
} from "../setItems/useSetItemsObserver";

interface treePatch {
  stage: number;
  setStage: (newValue: number) => void;
  type: string;
  setType: (newValue: string) => void;
  timer: number;
  setTimer: (newValue: number) => void;
}

export const useTreePatchesObserver = (id: string): treePatch[] => {
  const hookId = `useTreePatchesObserver-${id}`;
  const [stage1, setStage1] = useNumberItemObserver(`tree_stage_1`, hookId);
  const [stage2, setStage2] = useNumberItemObserver(`tree_stage_2`, hookId);
  const [stage3, setStage3] = useNumberItemObserver(`tree_stage_3`, hookId);
  const [stage4, setStage4] = useNumberItemObserver(`tree_stage_4`, hookId);
  const [stage5, setStage5] = useNumberItemObserver(`tree_stage_5`, hookId);

  const [type1, setType1] = useItemObserver(`tree_1`, hookId);
  const [type2, setType2] = useItemObserver(`tree_2`, hookId);
  const [type3, setType3] = useItemObserver(`tree_3`, hookId);
  const [type4, setType4] = useItemObserver(`tree_4`, hookId);
  const [type5, setType5] = useItemObserver(`tree_5`, hookId);

  const [timer1, setTimer1] = useNumberItemObserver(`tree_timer_1`, hookId);
  const [timer2, setTimer2] = useNumberItemObserver(`tree_timer_2`, hookId);
  const [timer3, setTimer3] = useNumberItemObserver(`tree_timer_3`, hookId);
  const [timer4, setTimer4] = useNumberItemObserver(`tree_timer_4`, hookId);
  const [timer5, setTimer5] = useNumberItemObserver(`tree_timer_5`, hookId);

  return [
    {
      stage: stage1,
      setStage: setStage1,
      type: type1,
      setType: setType1,
      timer: timer1,
      setTimer: setTimer1,
    },
    {
      stage: stage2,
      setStage: setStage2,
      type: type2,
      setType: setType2,
      timer: timer2,
      setTimer: setTimer2,
    },
    {
      stage: stage3,
      setStage: setStage3,
      type: type3,
      setType: setType3,
      timer: timer3,
      setTimer: setTimer3,
    },
    {
      stage: stage4,
      setStage: setStage4,
      type: type4,
      setType: setType4,
      timer: timer4,
      setTimer: setTimer4,
    },
    {
      stage: stage5,
      setStage: setStage5,
      type: type5,
      setType: setType5,
      timer: timer5,
      setTimer: setTimer5,
    },
  ];
};
