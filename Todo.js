const { log } = require("console");
const fs = require("fs");
const { json } = require("stream/consumers");
const filePath = "./tasks.json";

const loadTasks = ()=>{
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString(); 
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTask = (tasks)=>{
   const dataJSON =  JSON.stringify(tasks);
   fs.writeFileSync(filePath,dataJSON);
};

const  listTasks = ()=>{
    const tasks = loadTasks();
    tasks.forEach((task,index)=>{
        console.log(`${index+1} - ${task}`);
    });
};

const addTask = (task)=>{
    const tasks = loadTasks();
    tasks.push({task});
    saveTask(tasks);
    console.log("Task Added Successfully ",task);
}

const removeTask = (arg)=>{
    arg -= 1;
    const arr = loadTasks();
    const updateTasks = arr.filter((t,i)=>{
       return i != arg
    })
    saveTask(updateTasks);
}
const cmd = process.argv[2];
const arg = process.argv[3];

if(cmd == "add"){
    addTask(arg)
}else if(cmd === "list"){
    listTasks();
}else if(cmd === "remove"){
    removeTask(parseInt(arg));
}else{
    console.log("Command Not Found");
}