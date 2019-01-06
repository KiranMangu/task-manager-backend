import express from 'express';
import Task from '../model/taskModel';
// import {
//     mongoose
// } from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Tasks API');
})

router.get('/tasks', (req, res) => {
    Task.find({}, (err, task) => {
        if (!!err) {
            console.log('Error: ' + err)
        } else {
            // console.log('Tasks: ' + JSON.stringify(task));
            res.send(task);
        }
    });

});

router.get('/task/:id', (req, res) => {
    // console.log('Task By Id: ')
    // console.log(req.params.id)
    // console.log(id)
    Task.findById({
        _id: req.params.id
    }, (err, task) => {
        if (!!err) {
            // console.log('Error: ' + err)
            res.status(400).send('Erroror Finding task by Id ')
        } else {
            // console.log('Tasks by id: ' + JSON.stringify(task));
            res.send(task);
        }
    });

});

// Update priority and Status
router.post('/task/update', (req, res) => {
     //console.log('update:' +req.body);
    Task.updateOne({
            _id: req.body.id
        }, {
            task: req.body.task,
            priority: req.body.priority,
            parentTask: req.body.parentTask,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        },
        //{ multi: true },
        (err, numDocsUpdated) => {
            if (err) {
                // console.log('Unable to update the task');
                res.status(400).send('Error updating the task')
            } else {
                 console.log('Number Docs Effected: ' + JSON.stringify(numDocsUpdated));
                res.status(200).json({'Number Docs Effected: ' : JSON.stringify(numDocsUpdated)});
            }
        });
});

// End Task
router.post('/task/complete', (req, res) => {
	//console.log("backend:"+ req.body.id);
    Task.updateOne({
            _id: req.body.id
        }, {
            finished: true
        },
        //{ multi: true }, 
        (err, numDocsUpdated) => {
            if (err) {
                console.log('Unable to update the task');
                res.status(400).send('Error updating the task')
            } else {
                 console.log('Number Docs Effected: ' + JSON.stringify(numDocsUpdated));
                res.status(200).json({'Number Docs Effected: ': JSON.stringify(numDocsUpdated)});
            }
        });
});

router.post('/task/create', (req, res) => {
    // let newTask = new Task(
    //     {
    //         task: "NewTask",
    //         parentTask: "ParentTask",
    //         startDate: "2019/01/01",
    //         endDate: "2019/01/01",
    //         complete: false,
    //         priority: 10
    //     });
    var mongoose = require('mongoose');
    let newTask = new Task(req.body);
    // console.log('mongoose:  ' + mongoose.Types.ObjectId);
    // newTask._id = mongoose.Types.ObjectId;
    // console.log('new Task:  ' + newTask);
    newTask.save()
        .then(issue => {
            res.status(200).json({
                'issue': 'Added successfully'
            });
        })
        .catch(err => {
            // console.log(err);
            res.status(400).send('Failed to create new Tasks' + err);
        });
});

// router.delete('/delete/:id', (req, res) => {
//     Task.deleteOne({ _id: req.params.id }, (err, res) => {
//         if (err) {
//             console.log('Error' + err);
//         }
//         else {

//         }
//     });
// });
export {
    router
};