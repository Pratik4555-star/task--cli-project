import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import {fileURLToPath} from 'url'
import process from 'process'


const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename)


const taskFile = path.join(_dirname, 'task.json')

const loadTask = ()=>{
    if(!fs.existsSync(taskFile)){
        return [];
    }

    const data = fs.readFileSync(taskFile, 'utf-8')
    return JSON.parse(data)
}

const saveTask = (tasks)=> {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null,4));
}

const addTask =(descrpition) => {
    const tasks = loadTask()
    const taskId= tasks.lenght + 1
    const newTask = {
        id: taskId,
        descrpition,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    saveTask(tasks)
    console.log(`Task is been saved succesfully with id : ${taskId}`)
}

const deleteTask = (taskId)=>{
    const task = loadTask()
    const updateTask = task.filter((task) => task.id !== taskId )
    saveTask(updateTask)
    console.log(`task is been updated with task id:${taskId}`)
}

const listTask =(status = null)=> {
    const tasks = loadTask()
    const filtertasks = status ?  tasks.filter((task) => task.status === status) : tasks;
    filtertasks.forEach((task) => {
        console.log(
            `id: ${task.id},
            Description: ${task.descrpition},
            Status: ${task.status},
            Created At; ${task.createdAt},
            Updated At: ${task.updateTask}`
            
        )
    });
}

const updatedTask = (taskId , description) => {
    const tasks = loadTask()
    const task = tasks.filter((task) => task.id === taskId)
    if(task){
        task.description = description;
        task.updatedAt = new Date().toISOString();
        saveTask(task)
        console.log(`Task with id: ${taskid} updtaed`);
    }else{
        console.log(`Task id not found , updation failed`);
    }
}

const markTask = (taskId, status)=> {
    if(!['in-progress', 'done'].includes(status)){
        console.log('invalid status, in-progress, done');
        return;
    }
    const tasks = loadTask();
    const task = tasks.filter((task)=> task.id === taskId);

    if(task){
        task.status = status
        task.updatedAt = new Date().toISOString();
        saveTask(task);
        conosle.log(`Task ${taskId} marked as ${status}.`)
    }else{
        conosle.log(`Task with ID ${taskId} not found.`)
    }
}

const handleCommand = () =>{
    const [,, command, ...args] = process.argv;

    switch(command) {
    case 'add': 
            addTask(args.join(' '));
        break;
    case 'delete': 
            const deleteId = parseInt(args[0], 10);
            deleteTask(deleteId);
        break;
    case 'list': 
            const status = args[0] || null;
            listTask(status);
        break;
    case 'update':
            const updateId = parseInt(args[0], 10);
            const description = args.slice(1).join(' ');
            updatedTask(updateId, description);
        break;
    case 'mark-in-progress':
            const inProgressId = parseInt(args[0], 10);
            markTask(inProgressId, 'in-progress');
        break;
    case 'mark-done':
            const doneId = parseInt(args[0], 10);
            markTask(doneId, 'done');
        break;
    default:
            console.log('Invalid command.');
    }
}

handleCommand()