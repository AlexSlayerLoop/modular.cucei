export const stringToNum = (str: string): string => {
  const nums: Record<string, string> = {
    uno: "1",
    dos: "2",
    tres: "3",
    cuatro: "4",
    cinco: "5",
    seis: "6",
    siete: "7",
    ocho: "8",
    nueve: "9",
    diez: "10",
    once: "11",
    doce: "12",
  };

  return nums[str.toLocaleLowerCase()] || "0";
};
