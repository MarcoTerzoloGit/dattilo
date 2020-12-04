const updateProgressService = (textLength = 1, insertedCharacterLength = 100): number => {
  return Math.round((insertedCharacterLength * 100) / textLength);
};

const updateScoreService = (previousValue = 0, lastCharacter: string, expectedCharacter: string): number => {
  return lastCharacter === expectedCharacter ? previousValue + 1 : previousValue - 1;
};

const updateSpeedService = (): Function => {
  let iLastTime = 0;
  let iTime = 0;
  let iTotal = 0;
  let iKeys = 0;

  return (): number => {
    iTime = new Date().getTime();

    if (iLastTime != 0) {
      iKeys++;
      iTotal += iTime - iLastTime;
      iLastTime = iTime;

      return Math.round((iKeys / iTotal) * 6000);
    }

    iLastTime = iTime;
    return 0;
  };
};

export { updateProgressService, updateScoreService, updateSpeedService };
