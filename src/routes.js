
const { addTaskHandler,getAllTaskHandler,getTaskByIdHandler,editTaskByIdHandler,deleteTaskByIdHandler } = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/tasks',
        handler: addTaskHandler,
    },
    {
        method: 'GET',
        path: '/tasks',
        handler:getAllTaskHandler,
    },
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: getTaskByIdHandler,
    },
    {
        method: 'PUT',
        path: '/tasks/{id}',
        handler: editTaskByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/tasks/{id}',
        handler: deleteTaskByIdHandler,

    }
];

module.exports = routes;