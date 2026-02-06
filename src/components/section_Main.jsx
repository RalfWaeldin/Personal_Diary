import NavigationMain from "./subSection_NavigationMain";
import ContentMain from "./subsection_ContentMain";
import DiaryData from "../modules/diaryData.js";
import { useState, useEffect } from "react";

function Main() {
  const diaryInstance = new DiaryData();
  const [diaryData, setDiaryData] = useState(diaryInstance.getEntries());

  useEffect(() => {
    console.log("Refresh");
  }, [diaryData]);
  return (
    <main className="bg-amber-100">
      <NavigationMain
        setDiaryData={setDiaryData}
        diaryData={diaryData}
        diaryInstance={diaryInstance}
      />
      <ContentMain diaryData={diaryData} diaryInstance={diaryInstance} />
    </main>
    /*
     <main className="bg-amber-100">
      <NavigationMain diarydataEffect={[diaryData, setDiaryData]} />
      <ContentMain data={diaryData} />
    </main>
    */
  );

  Main();
}

export default Main;
