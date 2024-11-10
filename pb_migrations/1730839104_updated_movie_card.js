/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y0h6k3qp",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4g6r6ga9gjblgb")

  // remove
  collection.schema.removeField("y0h6k3qp")

  return dao.saveCollection(collection)
})
