import { useState } from "react";
import { AUCTION_FEE, IManufactureInfo, NUMBER_OF_BUNDLES } from "./constants";

interface Props {
  manufactureName: string;
  manufactureInfo: IManufactureInfo;
  developmentEffect: number;
}

interface ICosts {
  [key: string]: number;
}

export default function Calculator({
  manufactureName,
  manufactureInfo,
  developmentEffect,
}: Props) {
  // ANCHOR: initial values
  const initialCosts = Object.fromEntries(
    Object.keys(manufactureInfo.recipe).map((val) => [val, 0])
  );

  // ANCHOR: states
  const [materialCosts, setMaterialCosts] = useState<ICosts>(initialCosts); // NOTE: {들꽃:0, 수줍은 들꽃:0}의 형태
  const [price, setPrice] = useState<number>(0);

  // ANCHOR: handlers
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };
  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialCosts((prev) => {
      return { ...prev, [e.target.name]: +e.target.value };
    });
  };

  // ANCHOR: functions
  const calculateCommission = (gold: number) => {
    return Math.floor(gold * 0.95);
  };

  // ANCHOR: variables
  const productionSalesProfit =
    calculateCommission(price) * manufactureInfo.count;
  const materialSalesProfit = Object.entries(materialCosts).reduce(
    (acc, [key, cost]) => {
      const numberOfBundles = NUMBER_OF_BUNDLES[key];
      const count = manufactureInfo.recipe[key];
      const result =
        (Math.floor(cost * (1 - AUCTION_FEE)) / numberOfBundles) * count;

      return acc + result;
    },
    0
  );
  const materialPurchaseCost = Object.entries(materialCosts).reduce(
    (acc, [key, cost]) => {
      const numberOfBundles = NUMBER_OF_BUNDLES[key];
      const count = manufactureInfo.recipe[key];
      const result = (cost / numberOfBundles) * count;

      return acc + result;
    },
    0
  );
  const productionCost = Math.floor(
    manufactureInfo.costGold * (1 - 0.01 * developmentEffect)
  );

  return (
    <>
      {JSON.stringify(manufactureInfo)}

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {Object.entries(manufactureInfo.recipe).map(([key, val]) => {
          return (
            <div key={key}>
              <b>{key}</b>
              <input
                name={key}
                type="number"
                value={materialCosts[key]}
                onChange={onChangeCost}
                placeholder="hehe"
              />
            </div>
          );
        })}
        <b>{manufactureName} 가격</b>
        <input
          name="price"
          type="number"
          value={price}
          onChange={onChangePrice}
          // placeholder={`${manufactureName} 가격`}
        />
        <button>계산</button>
        원재료 판매 수익: {materialSalesProfit.toFixed(2)}
        제작물 판매 수익: {(productionSalesProfit - productionCost).toFixed(2)}
        원재료 판매 대비 생산의 기대 수익:{" "}
        {(productionSalesProfit - materialSalesProfit - productionCost).toFixed(
          2
        )}
        사서 만들어 팔 경우 기대 수익:
        {(
          productionSalesProfit -
          materialPurchaseCost -
          productionCost
        ).toFixed(2)}
      </form>
    </>
  );
}
