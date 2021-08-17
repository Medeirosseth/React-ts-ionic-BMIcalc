import React, { useRef, useState } from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./Components/BmiControls";
import BmiResult from "./Components/BmiResult";
import InputControl from "./Components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBMI, setCaclculatedBMI] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("ftlbs");

  const inputHeightRef = useRef<HTMLIonInputElement>(null);
  const inputWeightRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = inputWeightRef.current!.value;
    const enteredHeight = inputHeightRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError("Enter a valid input number");
      return;
    }

    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversionFacror = calcUnits === "ftlbs" ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFacror;

    const bmi = weight / (height * height);

    setCaclculatedBMI(bmi);
  };

  const resetInputs = () => {
    inputWeightRef.current!.value = "";
    inputHeightRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selecetCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };
  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />

      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Bmi Calculator </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selecetCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    {" "}
                    Your Height ({calcUnits === "mkg" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={inputHeightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    {" "}
                    Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={inputWeightRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBMI && <BmiResult result={calculatedBMI} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
