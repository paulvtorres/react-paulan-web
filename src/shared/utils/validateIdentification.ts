export const validateIdentification = (type: string, id: string): boolean => {
  if (type === "05") return validateCedula(id);
  if (type === "04") return id.length === 13 && validateCedula(id.slice(0, 10));
  if (type === "07") return id === "9999999999999";
  return true;
};

export const validateCedula = (cedula: string): boolean => {
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  const digits = cedula.split("").map(Number);
  const checkDigit = digits.pop()!;
  let sum = 0;

  digits.forEach((d, i) => {
    let val = d;
    if (i % 2 === 0) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    sum += val;
  });

  const computed = (10 - (sum % 10)) % 10;
  return computed === checkDigit;
};