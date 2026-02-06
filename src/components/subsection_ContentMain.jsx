import ListItem from "./list_Item";
import ItemGroup from "./group_items";

function ContentMain(props) {
  console.log("ContentMain props:", props);
  return (
    <section id="main-content" className="min-h-96 flex">
      <div className="border w-svw m-5 p-5">
        {props.diaryData.length == 0
          ? "keine Eintr&auml;ge"
          : props.diaryData.map((groupentry, index) => (
              <ItemGroup
                key={index}
                group={groupentry}
                groupIndex={index}
                diaryInstance={props.diaryInstance}
              />
            ))}
      </div>
    </section>
  );
}

export default ContentMain;
