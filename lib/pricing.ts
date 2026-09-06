export function calculateRidePrice({
  miles,
  minutes,
  demandMultiplier = 1
}: {
  miles: number;
  minutes: number;
  demandMultiplier?: number;
}) {
  const bookingFee = 1.75;
  const perMile = 1.05;
  const perMinute = 0.19;

  const raw =
    (bookingFee +
      miles * perMile +
      minutes * perMinute) *
    demandMultiplier;

  const fareUsd =
    Number(Math.max(6, raw).toFixed(2));

  const platformBps =
    Number(process.env.PLATFORM_FEE_BPS || 1200);

  const platformFeeUsd =
    Number(
      (
        fareUsd *
        platformBps /
        10000
      ).toFixed(2)
    );

  const driverEarningsUsd =
    Number(
      (
        fareUsd -
        platformFeeUsd
      ).toFixed(2)
    );

  // Demo peg for initial UI.
  // Later this comes from real market execution.
  const rideTokenUsd =
    1;

  const rideTokens =
    Number(
      (
        fareUsd /
        rideTokenUsd
      ).toFixed(6)
    );

  return {
    fareUsd,
    driverEarningsUsd,
    platformFeeUsd,
    rideTokens,
    platformBps
  };
}
