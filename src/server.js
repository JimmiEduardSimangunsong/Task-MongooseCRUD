const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const routes = require('./routes');


// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Koneksi ke MongoDB berhasil');
});


// Buat server 
const init = async () => {
    const server = Hapi.server({
      port: 9000,
      host: 'localhost',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
   
    server.route(routes);
   
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  };
   
  init();
