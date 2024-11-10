/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sixj0chjjarvo7a",
    "created": "2024-11-10 12:48:06.892Z",
    "updated": "2024-11-10 12:48:06.892Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gxg2n7js",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": true,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sixj0chjjarvo7a");

  return dao.deleteCollection(collection);
})
