var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Nutel Service',
  description: 'Server for Nutel management',
  script: 'C:\\Users\\mathe\\Documents\\Faculdade\\BD\\Trabalho\\nutel_server\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
