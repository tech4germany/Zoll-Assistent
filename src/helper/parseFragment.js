import { capFLetter } from "./capitalizeFirstLetter";

export const parseFragment = (fragment) => {
  const parsedData = {};
  if (fragment) {
    fragment = fragment.replace("#", "");
    fragment = fragment.split(";");
    fragment.map((el) => {
      const keyValPair = el.split("=");
      parsedData[keyValPair[0]] = capFLetter(keyValPair[1]);
    });
  }
  return parsedData;
};
