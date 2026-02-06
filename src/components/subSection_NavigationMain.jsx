import { useState } from "react";
import NavigationButton, { GetActualDate } from "./button_Navigation";

function NavigationMain(props) {
  console.log("NavigationMain props:", props);
  const [actualDate, setActualDate] = useState(GetActualDate());
  const onDeleteLast = () => {
    props.diaryInstance.deleteLastEntry();
    props.setDiaryData(props.diaryInstance.getEntries());
  };

  return (
    <nav className="px-5 pt-2 pb-2 border-b border-b-amber-500 flex flex-row-reverse ">
      <NavigationButton
        setDiaryData={props.setDiaryData}
        diaryData={props.diaryData}
        diaryInstance={props.diaryInstance}
        setDate={setActualDate}
        actualDate={actualDate}
        label="Neuer Eintrag"
        buttontype="modal"
        handleOnClick=""
      />
      <NavigationButton
        setDiaryData={props.setDiaryData}
        diaryData={props.diaryData}
        diaryInstance={props.diaryInstance}
        setDate={setActualDate}
        actualDate={actualDate}
        label="delete last"
        buttontype="function"
        handleOnClick={onDeleteLast}
      />
    </nav>
  );
}

export default NavigationMain;
