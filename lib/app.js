var $ = require('jquery');

module.exports = function(list){
  list = list || [];
  var h = function(tagName){ return document.createElement(tagName) };
  var app = h('div');

  var createTask = h('div');
  createTask.className = 'create-task';

  var name = h('input');
  name.type = 'text';

  var add = h('button');
  add.innerText = 'Add';
  add.onclick = function(){
    addTaskToList(name.value);
  }

  createTask.appendChild(name);
  createTask.appendChild(add);
  
  app.appendChild(createTask);

  var taskList = h('ul');
  taskList.className = 'tasks';

  function addTaskToList(taskName){
    var task = h('li');
    task.className = 'task';
    task.innerText = taskName;
    taskList.appendChild(task);
  }

  list.forEach(addTaskToList);

  app.appendChild(taskList);


  var save = h('button');
  save.innerText = 'Save';
  save.onclick = function(){
    $.ajax({
      method: 'POST',
      url: '/save',
      contentType: 'application/json',
      data: JSON.stringify(list)
    });
  }

  app.appendChild(save);

  return app;
}
