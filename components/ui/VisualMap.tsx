"use client";

export default function VisualMap({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "visualMap visualMapCompact"
          : "visualMap"
      }
    >
      <div className="mapGlow mapGlowA" />
      <div className="mapGlow mapGlowB" />

      <div className="cityGrid cityGridA" />
      <div className="cityGrid cityGridB" />

      <div className="building b1" />
      <div className="building b2" />
      <div className="building b3" />
      <div className="building b4" />
      <div className="building b5" />
      <div className="building b6" />
      <div className="building b7" />

      <div className="road road1" />
      <div className="road road2" />
      <div className="road road3" />
      <div className="road road4" />

      <svg
        className="routeSvg"
        viewBox="0 0 900 650"
        preserveAspectRatio="none"
      >
        <path
          className="routeShadow"
          d="M110,520 C190,470 230,500 295,440 C370,370 335,280 430,250 C525,220 570,305 655,260 C730,220 740,145 825,100"
        />

        <path
          className="routeLine"
          d="M110,520 C190,470 230,500 295,440 C370,370 335,280 430,250 C525,220 570,305 655,260 C730,220 740,145 825,100"
        />
      </svg>

      <div className="pin pickupPin">
        <span />
        <div>
          <small>PICKUP</small>
          <strong>East Ave</strong>
        </div>
      </div>

      <div className="pin destinationPin">
        <span />
        <div>
          <small>DROP-OFF</small>
          <strong>ROC Airport</strong>
        </div>
      </div>

      <div className="driverCar carA">
        <div className="carBody">R</div>
        <span>2 min</span>
      </div>

      <div className="driverCar carB">
        <div className="carBody darkCar">R</div>
        <span>4 min</span>
      </div>

      <div className="driverCar carC">
        <div className="carBody ivoryCar">R</div>
        <span>6 min</span>
      </div>

      <div className="mapHud">
        <div className="mapHudDot" />

        <span>
          18 drivers nearby
        </span>

        <strong>
          LIVE
        </strong>
      </div>
    </div>
  );
}
