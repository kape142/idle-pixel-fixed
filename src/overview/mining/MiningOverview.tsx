import IPimg from "../../util/IPimg";
import { useItemObserver, useNumberItemObserver } from "../setItems/useSetItemsObserver";
import MachineDisplay from "./MachineDisplay";
import { MACHINES } from "./machines";
import OverviewBox from "../OverviewBox";
import LabeledIPimg from "../../util/LabeledIPimg";
import { useState, MouseEvent } from "react";

const id = "MiningOverview";
const MiningOverview = () => {
  const [oilIn] = useNumberItemObserver("oil_in", id);
  const [oilOut, setOilOut] = useNumberItemObserver("oil_out", id);

  const [miningXp] = useNumberItemObserver("mining_xp", id);
  const miningLevel = get_level(miningXp);

  const changeOilOut = (change: number) => setOilOut(oilOut + change);

  const [rocket] = useNumberItemObserver("rocket", id);
  const [rocketStatus] = useItemObserver("rocket_status", id);
  const [rocketKm] = useNumberItemObserver("rocket_km", id);
  const [rocketDistanceRequired] = useNumberItemObserver("rocket_distance_required", id);
  const [rocketFuel] = useNumberItemObserver("rocket_fuel", id);

  const onRocketClick = (event: MouseEvent) => {
    Modals.clicks_rocket();
  };

  return (
    <OverviewBox height={250} width={400}>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <LabeledIPimg
          name={"oil"}
          label={`${oilIn > oilOut ? "+" : ""}${oilIn - oilOut}`}
          size={50}
          width={100}
          style={{
            justifyContent: "center",
            color: oilIn >= oilOut ? "#000000" : "#ff0000",
            filter: oilIn >= oilOut ? "" : "invert(16%) sepia(91%) saturate(5761%) hue-rotate(357deg) brightness(96%) contrast(116%)",
          }}
        />

        {rocket > 0 &&
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <IPimg
                name={rocketKm > 0 ? "rocket" : "rocket_idle"}
                ext={rocketKm > 0 ? "gif" : "png"}
                size={50}
                onClick={onRocketClick}
                className={rocketKm > 0 && rocketKm < rocketDistanceRequired ? "shake" : ""}
                title={Items.get_pretty_item_name("rocket")}
                role={"button"}
              />
              <span>{Items.get_pretty_item_name(rocketStatus)}</span>
            </div>

            <LabeledIPimg
              name={"rocket_fuel"}
              label={rocketFuel}
              size={50}
              style={{ justifyContent: "center" }}
            />
          </>
        }
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {Object.keys(MACHINES).map((machine) => (
          <MachineDisplay
            machine={machine}
            changeOilOut={changeOilOut}
            {...MACHINES[machine]}
            miningLevel={miningLevel}
            key={machine}
          />
        ))}
      </div>
    </OverviewBox>
  );
};

export default MiningOverview;
