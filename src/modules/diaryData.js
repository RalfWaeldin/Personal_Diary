class DiaryData {
  #entryList = [];

  #groupedEntryList = [];

  #getEntriesFromStorage() {
    const myEntries = localStorage.getItem("myDiary");
    this.#entryList = JSON.parse(myEntries);

    this.#getGroupedEntryList();
  }

  #getGroupedEntryList() {
    let key = 0;
    this.#groupedEntryList = [];
    this.#entryList.map((entry, index) => {
      const entrydate = entry.recordDate;
      const foundGroup = this.#groupedEntryList.find(
        (value) => value.date == entrydate,
      );
      if (foundGroup == undefined) {
        const itemGroup = [];
        const updatedEntry = { ...entry, id: 0, originalArrayIndex: index };
        itemGroup.unshift(updatedEntry);
        this.#groupedEntryList.push({
          id: key,
          date: entrydate,
          items: itemGroup,
        });
        key++;
      } else {
        const updatedEntry = {
          ...entry,
          id: foundGroup.items.length,
          originalArrayIndex: index,
        };
        foundGroup.items.unshift(updatedEntry);
      }
    });
  }

  constructor() {
    this.#getEntriesFromStorage();
    console.log("linear List", this.#entryList);
    console.log("grouped List", this.#groupedEntryList);
  }

  addFormEntry(formObject) {
    console.log("addFormEntry:", formObject);
    this.#entryList.unshift(
      new DiaryRecord(
        "",
        formObject.date,
        formObject.time,
        formObject.title,
        formObject.imageUrl,
        formObject.eintrag,
      ),
    );
    this.#getGroupedEntryList();
    localStorage.setItem("myDiary", JSON.stringify(this.#entryList));
  }

  getLinearEntries() {
    return this.#entryList;
  }

  getLinearItemByIndex(arrayIndex) {
    const entry = this.#entryList[arrayIndex];
    console.log("getLinearItemByIndex(" + arrayIndex + "):", entry);
    return entry;
  }

  getEntries() {
    return this.#groupedEntryList;
  }

  deleteLastEntry() {
    this.#entryList.shift();
    this.#getGroupedEntryList();
    localStorage.setItem("myDiary", JSON.stringify(this.#entryList));
  }
}

export default DiaryData;

class DiaryRecord {
  constructor(
    objectString = "",
    recordDate = "",
    recordTime = "",
    recordTitle = "",
    recordUrl = "",
    recordMessage = "",
  ) {
    if (objectString === "") {
      this.recordDate = recordDate;
      this.recordTime = recordTime;
      this.recordTitle = recordTitle;
      this.recordUrl = recordUrl;
      this.recordMessage = recordMessage;
    } else {
      const entry = JSON.parse(objectString);
      this.recordDate = entry.recordDate;
      this.recordTime = entry.recordTime;
      this.recordTitle = entry.recordTitle;
      this.recordUrl = entry.recordUrl;
      this.recordMessage = entry.recordMessage;
    }
  }
}
