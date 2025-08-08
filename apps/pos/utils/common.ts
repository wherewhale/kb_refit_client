export const convertNumberBusinessNumberToString = (
  businessNumber: number
): string => {
  let strBusinessNumber = businessNumber.toString();
  while (strBusinessNumber.length < 10) {
    strBusinessNumber = "0" + strBusinessNumber;
  }
  return strBusinessNumber.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
};
