import React, { createContext, ReactNode, useContext, useState } from "react";

export type AnomalyItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  shared: boolean;
};

type AnomaliesContextType = {
  myAnomalies: AnomalyItem[];
  addAnomaly: (
    title: string,
    description: string,
    image: string,
    shared: boolean
  ) => void;
};

const AnomaliesContext = createContext<AnomaliesContextType | undefined>(
  undefined
);

export function AnomaliesProvider({ children }: { children: ReactNode }) {
  const [myAnomalies, setMyAnomalies] = useState<AnomalyItem[]>([]);

  const addAnomaly = (
    title: string,
    description: string,
    image: string,
    shared: boolean
  ) => {
    const newAnomaly: AnomalyItem = {
      id: Date.now().toString(),
      title,
      description,
      image,
      shared,
    };

    setMyAnomalies((prev) => [newAnomaly, ...prev]);
  };

  return (
    <AnomaliesContext.Provider value={{ myAnomalies, addAnomaly }}>
      {children}
    </AnomaliesContext.Provider>
  );
}

export function useAnomalies() {
  const context = useContext(AnomaliesContext);
  if (!context) {
    throw new Error("useAnomalies must be used inside AnomaliesProvider");
  }
  return context;
}