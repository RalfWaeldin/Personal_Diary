import { useRef, useCallback } from "react";
import "../index.css";

export function GetActualDate() {
  const objToday = new Date(),
    weekday = new Array(
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ),
    dayName = weekday[objToday.getDay()],
    dayOfMonth = objToday.getDay() + 1,
    formatDay = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth,
    months = new Array(
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ),
    monthName = months[objToday.getMonth()],
    monthOfYear = objToday.getMonth() + 1,
    formatMonth = monthOfYear < 10 ? "0" + monthOfYear : monthOfYear,
    year = objToday.getFullYear(),
    hour =
      objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    minute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    second =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    printDate = dayName + ", " + dayOfMonth + ". " + monthName + " " + year,
    formatDate = formatDay + "." + formatMonth + "." + year,
    formatTime = hour + ":" + minute + ":" + second;

  const actualDate = {
    printDate: printDate,
    formatDate: formatDate,
    formatTime: formatTime,
  };

  return actualDate;
}

function NavigationButton(props) {
  console.log("NavigationButton props:", props);
  const inputref = useRef < HTMLDialogElement > null;

  /* form submit */
  const handleEntrySubmit = (e) => {
    e.preventDefault(); // stop page reload

    const formData = {
      date: e.target.elements.hidden_date.value,
      time: e.target.elements.hidden_time.value,
      title: e.target.elements.input_title.value,
      imageUrl: e.target.elements.input_imageUrl.value,
      eintrag: e.target.elements.input_eintrag.value,
    };

    const validationMessage = (data) => {
      const message =
        data.title == ""
          ? "Es muß ein Titel eingegeben werden"
          : data.imageUrl == ""
            ? "Es muß eine Url eingegeben werden"
            : data.eintrag == ""
              ? "Es muß ein Eintrag eingegeben werden"
              : "";
      return message;
    };

    const validationResult = validationMessage(formData);

    if (validationResult !== "") {
      eintrag_fehler.innerText = validationResult;
    } else {
      eintrag_fehler.innerText = "";
      //const data = props.data;
      console.log("Before:", props.diaryData);
      props.diaryInstance.addFormEntry(formData);
      props.setDiaryData(props.diaryInstance.getEntries());
      console.log("After:", props.diaryData);

      addEntry.close();
    }
  };

  /* form cancel */
  const handleEntryCancel = (e) => {
    eintrag_fehler.innerText = "";
    addEntry.close();
  };

  const handleShowModal = useCallback(() => {
    props.setDate(GetActualDate);
    addEntry.showModal();
  }, [inputref]);

  return (
    <>
      <button
        className="btn btn-outline btn-warning px-5 ml-1 rounded-full"
        onClick={
          props.buttontype !== "modal" ? props.handleOnClick : handleShowModal
        }
      >
        {props.label}
      </button>

      <dialog id="addEntry" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Neuer Eintrag</h3>
          <div className="modal-action">
            <form
              id="add-entry"
              onSubmit={handleEntrySubmit}
              method="dialog"
              className="w-full"
            >
              <div>
                <div className="flex mb-2">
                  <label htmlFor="datum" className="w-24 text-gray-400">
                    Datum:
                  </label>
                  <div id="datum" className="w-full text-nowrap">
                    {props.actualDate ? props.actualDate.printDate : "no Date"}
                  </div>
                </div>
                <div className="flex mb-2">
                  <label htmlFor="uhrzeit" className="w-24 text-gray-400">
                    Uhrzeit:
                  </label>
                  <div id="uhrzeit" className="w-full">
                    {props.actualDate ? props.actualDate.formatTime : "no Time"}
                  </div>
                </div>
                <input
                  id="hidden_date"
                  type="hidden"
                  value={
                    props.actualDate ? props.actualDate.formatDate : "no Date"
                  }
                />
                <input
                  id="hidden_time"
                  type="hidden"
                  value={
                    props.actualDate ? props.actualDate.formatTime : "no Time"
                  }
                />
                <div className="flex mb-2">
                  <label htmlFor="input_title" className="w-24 text-gray-400">
                    Titel:
                  </label>
                  <input
                    id="input_title"
                    type="text"
                    className="border w-full"
                  />
                </div>
                <div className="flex mb-2">
                  <label
                    htmlFor="input_imageUrl"
                    className="w-24 text-gray-400"
                  >
                    Image Url:
                  </label>
                  <input
                    id="input_imageUrl"
                    type="text"
                    className="border w-full"
                  />
                </div>
                <div className="flex mb-2">
                  <label
                    htmlFor="input_eintrag"
                    className="w-24  text-gray-400"
                  >
                    Eintrag:
                  </label>
                  <textarea
                    name="eintrag"
                    id="input_eintrag"
                    className="border w-full h-30"
                  ></textarea>
                </div>
                <div id="eintrag_fehler" className="text-red-700 mb-2"></div>
                <div className="flex">
                  <button
                    id="btn_abbrechen"
                    type="button"
                    className="btn"
                    onClick={handleEntryCancel}
                  >
                    Abbrechen
                  </button>
                  <button id="btn_eintragen" type="submit" className="btn">
                    Eintragen
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default NavigationButton;
