const Task = require('./models/task_model');
const { nanoid } = require('nanoid');

//Add Tugas
const addTaskHandler = async (request, h) => {
    const { name, description, tags } = request.payload;
    const id = nanoid(2);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const done = false;
    
    if (name == null || description == null || tags == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan task. Mohon isi nama, deskripsi, dan tags'
        });
        response.code(400);
        return response;
    }

    const newTask = {
        name, description, tags, id, createdAt, updatedAt, done
    };
    // Task.push(newTask);
    try {
        const instance = new Task(newTask);
        await instance.save();

        const response = h.response({
            status: 'success',
            message: 'Task berhasil ditambahkan',
            data: {
                task: newTask
            }
        });
        response.code(201);
        return response;
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Task gagal ditambahkan'
        });
        response.code(500);
        return response;
    }
};


//melihat semua tugas
const getAllTaskHandler = async (request, h) => {
    const datas = await Task.find();

    if(!datas){
        const response=(h.response({
            status:'Success',
            message:'Kamu Tidak memiliki Tugas',
            data:{
                task:[],
            },
        }));
    }
    const response = h.response({
        status: 'success',
        data: {
            tasks: datas.map((task) => ({
                id: task.id,
                name: task.name,
                tags: task.tags,
            })),
        },
    });
    response.code(200);
    return response;
};

//mendapatkan detail tugas berdasarkan ID
const getTaskByIdHandler = async(request, h) => {
    const { id } = request.params;
    try{
    const data =await Task.findOne({id: id}, 'id tags name').exec();
    if (data) {
        return {
            status: 'success',
            data
        };
    }else{
    const response = h.response({
        status: 'fail',
        message: 'ID tidak ditemukan',
    });
    response.code(404);
    return response;
}
    }catch(error){
        const response = h.response({
            status: 'fail',
            message: 'server error'
        });
        response.code(500);
        return response;

    }
};

//memperbarui tugas berdasarkan ID
const editTaskByIdHandler = async(request, h) => {
    const { id } = request.params;
    const { name, description, tags,done } = request.payload;
    const updatedAt = new Date().toISOString();
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui task. Mohon isi nama task',
        });
        response.code(400);
        return response;
    }
    const data = await Task.findOneAndUpdate({id: id}, {name, description, tags,done,updatedAt})

    if(!data){
        const response = h.response({
                status: 'fail',
                message: 'Task gagal diupdate. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }


        const response = h.response({
            status: 'success',
            message: 'Task berhasil diperbarui',
        });
        response.code(200);
        return response;
};

//menghapus tugas berdasarkan ID
const deleteTaskByIdHandler = async(request, h) => {
    const { id } = request.params;
    const data = await Task.findOneAndDelete({id: id});
    if(!data){
        const response = h.response({
                status: 'fail',
                message: 'Task gagal dihapus. Id tidak ditemukan',
            });
            response.code(404);
            return response;
        }

    const response = h.response({
        status: 'success',
        message: 'Task berhasil dihapus',
    });
    response.code(200);
    return response;
    // 
};


module.exports = { addTaskHandler, getAllTaskHandler, getTaskByIdHandler, editTaskByIdHandler, deleteTaskByIdHandler };

