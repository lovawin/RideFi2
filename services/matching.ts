export type DriverCandidate = {
  driverId: string;

  rating: number;

  verified: boolean;
  online: boolean;

  distanceMiles: number;
};

export function rankDrivers(
  drivers: DriverCandidate[]
) {

  return drivers
    .filter(
      driver =>
        driver.online &&
        driver.verified &&
        driver.rating >= 4.2
    )
    .sort(
      (a, b) =>
        a.distanceMiles -
        b.distanceMiles
    );
}
