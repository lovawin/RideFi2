export function
detectRouteDeviation(
  expectedMeters: number,
  actualMeters: number
) {

  if (
    expectedMeters <= 0
  ) {
    return {
      alert: false,
      severity: "LOW"
    };
  }

  const ratio =
    actualMeters /
    expectedMeters;

  if (
    ratio >= 1.8
  ) {
    return {
      alert: true,
      severity: "HIGH"
    };
  }

  if (
    ratio >= 1.35
  ) {
    return {
      alert: true,
      severity: "MEDIUM"
    };
  }

  return {
    alert: false,
    severity: "LOW"
  };
}
