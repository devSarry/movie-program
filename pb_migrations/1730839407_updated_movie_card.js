/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kfdfptvm",
    "name": "movie_poster",
    "type": "file",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // remove
  collection.schema.removeField("kfdfptvm")

  return dao.saveCollection(collection)
})
