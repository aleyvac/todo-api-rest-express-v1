const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : process.env.DB_HOST || 'localhot',
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_DATABASE || 'todo_app',
    port     : process.env.DB_PORT || 3306
  });
  

  connection.connect((error) => {
    if (error) {
      console.error('Error al conectar a la base de datos: ', error);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
  });
// connection.end()

//si esta aparte en un archivo hay q exportarlo
module.exports = connection;
