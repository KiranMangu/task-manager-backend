import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Task = new Schema({
    _id: { type: Schema.Types.ObjectId },
    task: { type: String, required: true },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: Date.now() },
    finished: { type: Boolean, default: false },
    priority: { type: Number, min: 0, max: 30, default: 0 },
    parentTask: { type: Schema.Types.ObjectId, ref: 'Task', required: false }
});

// Force Mongoose to use the given name instead of pluralizing
// let Task = new Schema({... }, {collection: 'task'});
// export default mongoose.model('task', Task, 'single');
// Schema.set('collection': 'single')
export default mongoose.model('task', Task);