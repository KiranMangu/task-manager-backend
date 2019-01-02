import express from 'express';
import Task from '../model/task';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Tasks API');
})

router.get('/tasks', (req, res) => {
    Task.find({}, (err, task) => {
        if (!!err) {
            console.log('Error: ' + err)
        }
        else {
            console.log('Tasks: ' + JSON.stringify(task));
            res.send(task);
        }
    });

});

router.get('/task/:id', (req, res) => {
    Task.find({ _id: req.params.id }, (err, task) => {
        if (!!err) {
            console.log('Error: ' + err)
        }
        else {
            console.log('Tasks: ' + JSON.stringify(task));
            res.send(task);
        }
    });

});

// Update priority and Status
router.post('/task/update', (req, res) => {
    Task.updateOne({ _id: req.params.id },
        {
            task: req.body.task,
            priority: req.body.priority,
            parentTask: req.body.parentTask,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }, (err, res) => {
            if (err) {
                console.log('Unable to update the task');
            }
            else {
                res.json('Updated successfully');
            }
        });
});

router.post('/task/complete', (req, res) => {
    Task.updateOne({ _id: req.body.id }, { finished: req.body.finished }, (err, res) => {
        if (err) {
            console.log('Unable to update the task');
        }
        else {
            res.json('Updated successfully');
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
    
    let newTask = new Task(req.body);
    console.log('task '+ newTask);
    newTask.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new Tasks');
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
export { router };