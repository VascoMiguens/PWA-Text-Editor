import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("Update the database");
  //opens the database
  const contentDB = await openDB("jate", 1);
  //create a transaction to read and write to the database
  const tx = contentDB.transaction("jate", "readwrite");
  //create an object store
  const store = tx.objectStore("jate");
  //put the content into it
  const request = store.put({ value: content });

  const result = await request;

  console.log("🚀 - data saved to the database", result);
};

// get all the content from the database
export const getDb = async () => {
  console.log("Get all the content from the database");
  //open the database
  const contentDB = await openDB("jate", 1);
  // create a read-only transaction on the "jate" object store
  const tx = contentDB.transaction("jate", "readonly");
  //create an object store
  const store = tx.objectStore("jate");
  // get all the content from the store and store it in the "result" variable
  const request = store.getAll();

  const result = await request;

  console.log("result.value", result);

  // return result;
};

initdb();
