export type RidePayment = {
  rideId: string;
  riderId: string;
  fareUsd: number;

  method:
    | "CARD"
    | "DEBIT"
    | "PAYPAL"
    | "CRYPTO"
    | "RIDE_BALANCE";
};

export async function
authorizeRidePayment(
  payment: RidePayment
) {

  /*
   * Production flow:
   *
   * 1. authorize payment
   * 2. get executable $RIDE price
   * 3. acquire $RIDE
   * 4. record treasury execution
   * 5. hold ride value
   * 6. settle at completion
   */

  return {
    authorized: true,

    provider:
      "not-connected",

    reference:
      `demo_${payment.rideId}`
  };
}
