"use client";

import React, { useState, useEffect } from "react";

// Force Client components to only be rendered on the client
export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  // State / Props
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  return <div>{children}</div>;
}
