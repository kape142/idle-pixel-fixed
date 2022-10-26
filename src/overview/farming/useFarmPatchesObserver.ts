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
  shiny: number;
  setShiny: (newValue: number) => void;
  death: number;
  setDeath: (newValue: number) => void;
}

const stageOverride = (value: number) => value === 4
const timerOverride = (value: number) => value === 1

export const useFarmPatchesObserver = (id: string): farmPatch[] => {
  const hookId = `useFarmPatchesObserver-${id}`;

  const [stage1, setStage1] = useNumberItemObserver(`farm_stage_1`, hookId, stageOverride);
  const [stage2, setStage2] = useNumberItemObserver(`farm_stage_2`, hookId, stageOverride);
  const [stage3, setStage3] = useNumberItemObserver(`farm_stage_3`, hookId, stageOverride);
  const [stage4, setStage4] = useNumberItemObserver(`farm_stage_4`, hookId, stageOverride);
  const [stage5, setStage5] = useNumberItemObserver(`farm_stage_5`, hookId, stageOverride);

  const [seed1, setSeed1] = useItemObserver(`farm_1`, hookId);
  const [seed2, setSeed2] = useItemObserver(`farm_2`, hookId);
  const [seed3, setSeed3] = useItemObserver(`farm_3`, hookId);
  const [seed4, setSeed4] = useItemObserver(`farm_4`, hookId);
  const [seed5, setSeed5] = useItemObserver(`farm_5`, hookId);

  const [timer1, setTimer1] = useNumberItemObserver(`farm_timer_1`, hookId, timerOverride);
  const [timer2, setTimer2] = useNumberItemObserver(`farm_timer_2`, hookId, timerOverride);
  const [timer3, setTimer3] = useNumberItemObserver(`farm_timer_3`, hookId, timerOverride);
  const [timer4, setTimer4] = useNumberItemObserver(`farm_timer_4`, hookId, timerOverride);
  const [timer5, setTimer5] = useNumberItemObserver(`farm_timer_5`, hookId, timerOverride);
  
  const [shiny1, setShiny1] = useNumberItemObserver(`farm_shiny_1`, hookId);
  const [shiny2, setShiny2] = useNumberItemObserver(`farm_shiny_2`, hookId);
  const [shiny3, setShiny3] = useNumberItemObserver(`farm_shiny_3`, hookId);
  const [shiny4, setShiny4] = useNumberItemObserver(`farm_shiny_4`, hookId);
  const [shiny5, setShiny5] = useNumberItemObserver(`farm_shiny_5`, hookId);
  
  const [death1, setDeath1] = useNumberItemObserver(`farm_death_1`, hookId);
  const [death2, setDeath2] = useNumberItemObserver(`farm_death_2`, hookId);
  const [death3, setDeath3] = useNumberItemObserver(`farm_death_3`, hookId);
  const [death4, setDeath4] = useNumberItemObserver(`farm_death_4`, hookId);
  const [death5, setDeath5] = useNumberItemObserver(`farm_death_5`, hookId);

  return [
    {
      stage: stage1,
      setStage: setStage1,
      seed: seed1,
      setSeed: setSeed1,
      timer: timer1,
      setTimer: setTimer1,
      shiny: shiny1,
      setShiny: setShiny1,
      death: death1,
      setDeath: setDeath1,
    },
    {
      stage: stage2,
      setStage: setStage2,
      seed: seed2,
      setSeed: setSeed2,
      timer: timer2,
      setTimer: setTimer2,
      shiny: shiny2,
      setShiny: setShiny2,
      death: death2,
      setDeath: setDeath2,
    },
    {
      stage: stage3,
      setStage: setStage3,
      seed: seed3,
      setSeed: setSeed3,
      timer: timer3,
      setTimer: setTimer3,
      shiny: shiny3,
      setShiny: setShiny3,
      death: death3,
      setDeath: setDeath3,
    },
    {
      stage: stage4,
      setStage: setStage4,
      seed: seed4,
      setSeed: setSeed4,
      timer: timer4,
      setTimer: setTimer4,
      shiny: shiny4,
      setShiny: setShiny4,
      death: death4,
      setDeath: setDeath4,
    },
    {
      stage: stage5,
      setStage: setStage5,
      seed: seed5,
      setSeed: setSeed5,
      timer: timer5,
      setTimer: setTimer5,
      shiny: shiny5,
      setShiny: setShiny5,
      death: death5,
      setDeath: setDeath5,
    },
  ];
};
