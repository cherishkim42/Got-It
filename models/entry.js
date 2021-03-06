const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require('../utils/autopopulate')

const EntrySchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  note: { type: String, required: false }, //aka description
  tagsString: [{ type: String, required: true }], //array of strings
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] //gonna remove this
})

//Always populate the tags field
EntrySchema.pre('findOne', Populate('tags')).pre('find', Populate('tags'))

module.exports = mongoose.model('Entry', EntrySchema)