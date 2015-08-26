var mount = require('./mount');

module.exports = function(createApp, data, options) {
  var div = mount(options);
  div.appendChild(createApp(data));
};
