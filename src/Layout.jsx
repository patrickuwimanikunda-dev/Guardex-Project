import React from "react";

export default function Layout({ children, currentPageName }) {
  // Dashboard and MobileApp have their own full-screen layouts
  if (currentPageName === "Dashboard" || currentPageName === "MobileApp" || currentPageName === "Home") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#060D18]">
      {children}
    </div>
  );
}