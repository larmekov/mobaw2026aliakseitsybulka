import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AnomalyItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type AnomaliesContextType = {
  myAnomalies: AnomalyItem[];
  addAnomaly: (
    title: string,
    description: string,
    image: string
  ) => void;
  deleteAnomaly: (id: string) => void;
};

const STORAGE_KEY = "my_anomalies";

const AnomaliesContext = createContext<AnomaliesContextType | undefined>(
  undefined
);

export function AnomaliesProvider({ children }: { children: ReactNode }) {
  const [myAnomalies, setMyAnomalies] = useState<AnomalyItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadAnomalies = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setMyAnomalies(JSON.parse(stored));
        }
      } catch (error) {
        console.log("Failed to load anomalies:", error);
      } finally {
        setLoaded(true);
      }
    };

    loadAnomalies();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const saveAnomalies = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(myAnomalies));
      } catch (error) {
        console.log("Failed to save anomalies:", error);
      }
    };

    saveAnomalies();
  }, [myAnomalies, loaded]);

  const addAnomaly = (
    title: string,
    description: string,
    image: string
  ) => {
    const newAnomaly: AnomalyItem = {
      id: Date.now().toString(),
      title,
      description,
      image,
    };

    setMyAnomalies((prev) => [newAnomaly, ...prev]);
  };

  const deleteAnomaly = (id: string) => {
    setMyAnomalies((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AnomaliesContext.Provider
      value={{ myAnomalies, addAnomaly, deleteAnomaly }}
    >
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