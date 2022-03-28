import React, { useState } from "react";
import { MANUFACTURES } from "../../components/calculator/manufacture";
import Calculator from "../../components/calculator/Calculator";

export default function CraftingCalculator() {
  const [developmentEffect, setDevelopmentEffect] = useState<number>(0); // NOTE: 영지 효과: 제작 비용 감소 퍼센트
  const [selectedKey, setSelectedKey] = useState<string>("");

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setSelectedKey(e.target.value);
  };

  return (
    <div>
      <div>
        <select onChange={selectHandler}>
          <option value="">-</option>
          {Object.entries(MANUFACTURES).map((val) => {
            const [key] = val;
            return (
              <option value={key} key={key}>
                {key}
              </option>
            );
          })}
        </select>

        <>
          영지효과-제작비감소:
          <input
            name="price"
            type="number"
            value={developmentEffect}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDevelopmentEffect(+e.target.value);
            }}
            // placeholder={`${manufactureName} 가격`}
          />
        </>
      </div>

      {selectedKey && (
        <Calculator
          manufactureName={selectedKey}
          manufactureInfo={MANUFACTURES[selectedKey]}
          {...{ developmentEffect }}
        />
      )}
    </div>
  );
}

/*
 * ANCHOR: Styles
 */

// const MainContainer = styled.div`
//   display: "inline-flex";
//   flex-direction: "column";
// `;
