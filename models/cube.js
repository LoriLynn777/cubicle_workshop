const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Accessory = require('./accessory');

const cubeSchema = new Schema ({
    _id: Number,
    name: String,
    description: String,
    imageUr1: String,
    level: { type: String, required: true },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }]
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;