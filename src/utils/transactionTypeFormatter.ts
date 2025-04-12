import upperFirst from "lodash/upperFirst";

export function singleTransTypeFormatter(type: string) {
  switch (type) {
    case "addLiquidity":
    case "increaseLiquidity":
      return { key: type, value: "Add Liquidity" };
    case "decreaseLiquidity":
    case "removeLiquidity":
      return { key: type, value: "Remove Liquidity" };
    default:
      return { key: type, value: upperFirst(type) };
  }
}

export function transactionTypeFormatter(types: string[]) {
  const __types = types.map((type) => {
    return singleTransTypeFormatter(type);
  });

  return __types;
}

export function singleTokenTransTypeFormatter(type: string) {
  return { key: type, value: upperFirst(type) };
}

export function tokenTransactionTypeFormatter(types: string[]) {
  const __types = types.map((type) => {
    return singleTokenTransTypeFormatter(type);
  });

  return __types;
}
