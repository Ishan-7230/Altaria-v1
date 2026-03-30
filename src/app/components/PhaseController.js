"use client";

import { SiteProvider } from "./SiteContext";
import LoadingScreen from "./LoadingScreen";
import SmoothScroll from "./SmoothScroll";
// import RawHtmlScreen from "./RawHtmlScreen";
// import BootSequence from "./BootSequence";

export default function PhaseController({ children }) {
  return (
    <SiteProvider>
      <LoadingScreen />
      {/* <RawHtmlScreen /> */}
      {/* <BootSequence /> */}
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </SiteProvider>
  );
}
