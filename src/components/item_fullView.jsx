import { useRef, useEffect } from "react";

function FullViewItem({ isOpen, onClose, arrayIndex, diaryInstance }) {
  const openView = useRef(null);

  const diaryRecord = diaryInstance.getLinearItemByIndex(arrayIndex);

  console.log("diaryRecord:", diaryRecord);

  useEffect(() => {
    if (isOpen) {
      openView.current?.showModal();
    } else {
      openView.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={openView} className="modal">
        <div className="m-20 bg-white rounded-2xl">
          <div className="flex p-2 bg-amber-200 rounded-t-2xl">
            <div className="font-[MyDatum]">
              <div className="text-2xl">{diaryRecord.recordDate}</div>
              <div className="text-xl">{diaryRecord.recordTime}</div>
            </div>
            <h3 className="font-bold text-2xl ml-5">
              {diaryRecord.recordTitle}
            </h3>
          </div>
          <div className="flex">
            <img src={diaryRecord.recordUrl} width="300px" alt="" />

            <div className="text-lg p-2">{diaryRecord.recordMessage}</div>
          </div>
          <div className="flex p-2 bg-amber-200 flex-row-reverse rounded-b-2xl">
            <button
              className="btn btn-outline btn-warning px-5 rounded-full "
              onClick={onClose}
              aria-label="Close"
            >
              Zur&uuml;ck
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default FullViewItem;
