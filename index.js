// Data Controller

// Store Tasks
var taskStore =[];

// contructor for task
var Task= function (id,description){
  this.id=id;
  this.description=description
}

// Add Task
function addTask(desc){
  var newTask,ID;

  //create new ID
  if(taskStore.length > 0){
   ID= taskStore[taskStore.length-1].id +1;
  } else{
    ID=0
  }

  //create new task
   newTask= new Task(ID,desc)
  //push it into data structure
    taskStore.push(newTask)
  //Return new task
  return newTask
}

// Delete Task
function deleteTask(id){
  var ids,index;
  //create array for Id's
  ids= taskStore.map(function(current){
     return current.id
   })
  // Find id's index
  index =ids.indexOf(parseInt(id))
  
  //Delete task
   if(index !==-1){
      taskStore.splice(index, 1)
   }
}
//UI Controller
var DOMStrings={
  addBtn:document.querySelector('.add_btn'),
  taskDescription:document.querySelector('.add_description'),
  taskContainer:document.querySelector('.task_list')
}

// Add task to the UI
function addListTask(task){
  var html,newHtml,element;
  //create HTML string with placeholder text
  html= `<div class="item clearfix" id="%id%">%description%<button class="item__done--btn">
          <i class="fa fa-check"></i></button><button class="item__delete--btn">
           <i class="fa fa-close"></i>
          </button></div>`
  //Replace the placeholder text with some actual data
  newHtml = html.replace('%id%',task?.id);
  newHtml = newHtml.replace('%description%',task?.description);

  //insert the HTML into DOM
   element =DOMStrings.taskContainer
   element.insertAdjacentHTML('beforeend',newHtml)
  
}

//Delete Task from UI

function deleteListTask(selecterId){
  var el;
  el= document.getElementById(selecterId)
  //Remove HTML from DOM
  el.remove();
}

//Done button

function doneListTask(selecterId){
  var el;
  el= document.getElementById(selecterId)
  // Add new class for description
  el.classList.toggle('item_description_done')
}

//App Controller
function ctrlAddTask(){
  var input,text,newTask;
  //get input data from DOM
  input =DOMStrings.taskDescription
  text = input.value
  // check for text

  if(text){
  //Add the task to the data structure
  newTask =addTask(text)
  //Add the task to UI
  addListTask(newTask)
  //Clear the field
  input.value=''
  input.focus()
  }
  
}

function ctlrDeleteTask(event){
  var taskId,doneBtn,clickedElement;
  doneBtn='fa fa-check'

  clickedElement =event.target.className
  //Find Id
  taskId= event.target.parentNode.parentNode.id
  if(clickedElement===doneBtn){
    //change UI
    doneListTask(taskId)
  
  } else if(taskId){
    //Delete the task from data structure
      deleteTask(taskId)
    //Delete the task from UI
      deleteListTask(taskId)
  }
}
DOMStrings.addBtn.addEventListener('click',ctrlAddTask)

document.addEventListener("keyup",function(event){
  if(event.key === 'Enter'){
    ctrlAddTask()
  }
})

DOMStrings.taskContainer.addEventListener('click',ctlrDeleteTask);