"use client";

import { SiteProvider } from "./SiteContext";
import LoadingScreen from "./LoadingScreen";
import SmoothScroll from "./SmoothScroll";

export default function PhaseController({ children }) {
  return (
    <SiteProvider>
      <LoadingScreen />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </SiteProvider>
  );
}
