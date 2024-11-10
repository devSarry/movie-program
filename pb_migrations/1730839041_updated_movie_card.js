/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // remove
  collection.schema.removeField("rllwrepv")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rllwrepv",
    "name": "ermove",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
