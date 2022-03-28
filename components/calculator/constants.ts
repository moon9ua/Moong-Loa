/*
 * ANCHOR: MANUFACTURES
 */

export interface IManufactureInfo {
  count: number;
  recipe: { [key: string]: number };
  costGold: number;
}

export interface IManufactures {
  [key: string]: IManufactureInfo;
}

export const MANUFACTURES: IManufactures = {
  회복약: {
    count: 3,
    recipe: {
      "수줍은 들꽃": 5,
      들꽃: 10,
    },
    costGold: 0,
  },

  "고급 회복약": {
    count: 3,
    recipe: {
      "수줍은 들꽃": 9,
      들꽃: 18,
    },
    costGold: 15,
  },

  "정령의 회복약": {
    count: 3,
    recipe: {
      "화사한 들꽃": 6,
      "수줍은 들꽃": 24,
      들꽃: 48,
    },
    costGold: 30,
  },

  "회오리 수류탄": {
    count: 3,
    recipe: {
      "화려한 버섯": 3,
      "싱싱한 버섯": 12,
      "부드러운 목재": 3,
      "투박한 버섯": 24,
    },
    costGold: 15,
  },

  "파괴 폭탄": {
    count: 3,
    recipe: {
      "화려한 버섯": 4,
      "싱싱한 버섯": 12,
      "묵직한 철광석": 6,
      "투박한 버섯": 32,
    },
    costGold: 15,
  },

  "페로몬 폭탄": {
    count: 3,
    recipe: {
      "화려한 버섯": 4,
      "싱싱한 버섯": 12,
      "묵직한 철광석": 6,
      "투박한 버섯": 32,
    },
    costGold: 15,
  },

  "중급 오레하 융화 재료": {
    count: 30,
    recipe: {
      "오레하 유물": 8,
      "희귀한 유물": 26,
      "고대 유물": 64,
    },
    costGold: 200,
  },

  "상급 오레하 융화 재료": {
    count: 20,
    recipe: {
      "오레하 유물": 16,
      "희귀한 유물": 29,
      "고대 유물": 94,
    },
    costGold: 245,
  },
};

/*
 * ANCHOR: NUMBER_OF_BUNDLES
 */

export interface INumberOfBundles {
  [key: string]: number;
}

export const NUMBER_OF_BUNDLES: INumberOfBundles = {
  들꽃: 100,
  "수줍은 들꽃": 10,
  "화사한 들꽃": 10,

  "투박한 버섯": 100,
  "싱싱한 버섯": 10,
  "화려한 버섯": 10,

  "묵직한 철광석": 10,
  "부드러운 목재": 10,

  "고대 유물": 100,
  "희귀한 유물": 10,
  "오레하 유물": 10,
};

/*
 * ANCHOR: etc
 */

export const AUCTION_FEE = 0.05;
