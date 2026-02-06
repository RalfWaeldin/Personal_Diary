import { useState, useRef, useCallback } from "react";
import FullViewItem from "./item_fullView";

function ListItem(props) {
  const fullView = useRef < HTMLDialogElement > null;
  const [modalFlag, setModalFlag] = useState(false);

  const onOpenFullView = () => setModalFlag(true);

  return (
    <>
      <div
        name={"eintrag_" + props.item.originalArrayIndex}
        key={props.item.id}
        id={props.item.originalArrayIndex}
        className="border flex mb-1"
        onClick={onOpenFullView}
      >
        <img src={props.item.recordUrl} alt="" width="100px" />
        <div className="ml-2">
          <div>
            <span className="text-amber-700">{props.item.recordTime}</span>
          </div>
          <div className="text-2xl font-bold text-amber-900">
            {props.item.recordTitle}
          </div>
        </div>
      </div>
      <FullViewItem
        isOpen={modalFlag}
        onClose={() => setModalFlag(false)}
        arrayIndex={props.item.originalArrayIndex}
        diaryInstance={props.diaryInstance}
      />
    </>
  );

  //isOpen, onClose
}

export default ListItem;
