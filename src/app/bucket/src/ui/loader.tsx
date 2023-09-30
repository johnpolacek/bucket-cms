import React from "react"

export const Loader = () => (
  <svg
    className="w-full h-full"
    width="72px"
    height="72px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style={{ margin: "auto", background: "none", display: "block", shapeRendering: "auto" }}
  >
    <circle cx="84" cy="50" r="10" fill="rgba(255, 255, 255, 0.2)">
      <animate attributeName="r" repeatCount="indefinite" dur="0.4464285714285714s" calcMode="spline" keyTimes="0;1" values="7;0" keySplines="0 0.5 0.5 1" begin="0s" />
      <animate
        attributeName="fill"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="discrete"
        keyTimes="0;0.25;0.5;0.75;1"
        values="rgba(255, 255, 255, 0.2);rgba(255, 255, 255, 0.4);rgba(255, 255, 255, 0.6);rgba(255, 255, 255, 0.8);rgba(255, 255, 255, 0.2)"
        begin="0s"
      />
    </circle>
    <circle cx="16" cy="50" r="10" fill="rgba(255, 255, 255, 0.4)">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;7;7;7"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
    </circle>
    <circle cx="50" cy="50" r="10" fill="rgba(255, 255, 255, 0.6)">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;7;7;7"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.4464285714285714s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.4464285714285714s"
      />
    </circle>
    <circle cx="84" cy="50" r="10" fill="rgba(255, 255, 255, 0.8)">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;7;7;7"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.8928571428571428s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.8928571428571428s"
      />
    </circle>
    <circle cx="16" cy="50" r="10" fill="rgba(255, 255, 255, 1)">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;7;7;7"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.3392857142857142s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1.7857142857142856s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-1.3392857142857142s"
      />
    </circle>
  </svg>
)
