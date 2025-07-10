// calculateIva.ts

export function calculateIva(base: number, percentage: number): number {
  return parseFloat((base * (percentage / 100)).toFixed(2));
}