import ListItem from "./list_Item";

function ItemGroup(props) {
  return (
    <section id="main-content" className="flex mb-2">
      {
        <div
          key={props.groupIndex}
          className="collapse collapse-arrow bg-base-100 border border-base-300"
        >
          {props.groupIndex === 0 ? (
            <input type="radio" name="my-accordion-2" defaultChecked />
          ) : (
            <input type="radio" name="my-accordion-2" />
          )}

          <div className="collapse-title font-[MyDatum] text-4xl">
            {props.group.date}
          </div>
          <div className="collapse-content text-sm">
            {props.group.items.map((item) => (
              <ListItem item={item} diaryInstance={props.diaryInstance} />
            ))}
          </div>
        </div>
      }
    </section>
  );
}

export default ItemGroup;
