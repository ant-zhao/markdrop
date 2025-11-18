
"use client";

import { useEffect } from "react";
import { useStatusStore } from "@/stores/useStatus";
import PageCommunicator from "@/lib/page-communicator";

export default function ClientComponent() {
  const { communicator, setCommunicator } = useStatusStore();

  useEffect(() => {
    setCommunicator(new PageCommunicator());

    return () => {
      communicator?.destroy();
    }
  }, []);

  return null;
}
