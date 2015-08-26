var browser = require('browser-monkey');

module.exports = browser.component({
  createTask: function(){
    return this.find('.create-task').component({
      name: function(){
        return this.find('input[type=text]');
      },
      add: function(){
        return this.find('button', {text: 'Add'});
      }
    });
  },
  taskNames: function(){
    return this.find('.tasks .task');
  },
  save: function(){
    return this.find('button', {text: 'Save'});
  }
});
