const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Definisikan model data
// Define a schema for a task
const taskSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    tags: String,
    id: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    done: {
        type: Boolean,
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;