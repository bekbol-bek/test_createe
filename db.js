let db;

const request = indexedDB.open("TestDatabase", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains("tests")) {
    db.createObjectStore("tests", { keyPath: "id" });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("База данных готова!");
};

request.onerror = function (event) {
  console.error("Ошибка при открытии базы данных:", event.target.error);
};
let dbReadyCallbacks = [];

function onDBReady(callback) {
  if (db) {
    callback();
  } else {
    dbReadyCallbacks.push(callback);
  }
}

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("База данных готова!");
  dbReadyCallbacks.forEach(cb => cb());
};
