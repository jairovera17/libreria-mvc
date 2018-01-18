/**
 * LibroController
 *
 * @description :: Server-side logic for managing libroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var operacion = ['CREATE','READ','UPDATE','DELETE'];
var resultados = ['EXITOSA','ERROR'];

const exec = require('child_process').exec;
const fs = require('fs');

function loggear(tiempo_init,tiempo_end,operacion_index){

  var tiempo_exec = tiempo_end - tiempo_init;
  var log = '\n'+operacion[operacion_index];
  log+='\n\ttiempo_inicio    => '+tiempo_init+' '+tiempo_init.getMilliseconds()
  +'\n\ttiempo_fin       => '+tiempo_end+' '+tiempo_end.getMilliseconds()
  +'\n\ttiempo_total (ms)=> '+(tiempo_end-tiempo_init);
  log+='\n';
  var instrumentos = exec('free && uptime && df -h',(error, stdout, stderr)=>{
    fs.appendFile('logs_data.log',`${log}
    ${stdout}`, function(err){
      if(err) throw err;
    });
  });
}

module.exports = {

  create_libro: function (req, res) {
    //Crea libro, no se admiten ISBN repetidos
    var tiempo_init = new Date;
   var params = req.allParams();
   Libro.create({
     titulo: params.titulo,
     autor: params.autor,
     editorial: params.editorial,
     isbn: params.isbn
   }).exec(function (err, resultado) {
     var tiempo_end = new Date;
     
     loggear(tiempo_init,tiempo_end,0)
     if(err)
       return res.badRequest();
     else return res.json(resultado)
   })
  },

  read_libro: function (req, res) {
    //Busca por titulo 'parecido'
   
    var tiempo_init = new Date;
    var params = req.allParams();
    Libro.find({
        titulo: {'contains': params.titulo}
    }).exec(function (err, resultado) {
      var tiempo_end = new Date;
      loggear(tiempo_init,tiempo_end,1)
      if(err){
        return res.badRequest();
      }
      else {
        return res.json(resultado)
      }
    })
  },

  update_libro: function (req, res) {
    //Modifica un libro por isbn
  
    var tiempo_init = new Date;
    var params = req.allParams();
    Libro.update({
      isbn:params.isbn
    },{
      titulo: params.titulo,
      autor:params.autor,
      editorial:params.editorial
    }).exec(function (err, resultado) {
      var tiempo_end = new Date;
      loggear(tiempo_init,tiempo_end,2)
      if(err)
        return res.badRequest();
      else
        return res.json(resultado)
    })
  },

  delete_libro: function (req, res) {
    //Elimina un libro por isbn
   
    var tiempo_init = new Date;
    var params = req.allParams();
    Libro.destroy({
      isbn: params.isbn
    }).exec(function (err, resultado) {
      var tiempo_end = new Date;
      loggear(tiempo_init,tiempo_end,3)
      if(err)
        return res.badRequest();
      else return res.json(resultado)
    })

  }

};

