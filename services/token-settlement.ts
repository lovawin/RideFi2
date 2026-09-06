export async function
quoteRideToken(
  fareUsd: number
) {

  /*
   * Temporary demo execution price.
   *
   * Replace with the real DEX /
   * treasury router quote.
   */

  const rideUsdPrice =
    1;

  return {
    fareUsd,
    rideUsdPrice,

    rideTokens:
      fareUsd /
      rideUsdPrice
  };
}
