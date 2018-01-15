/**
 * LibroController
 *
 * @description :: Server-side logic for managing libroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var operacion = ['CREATE','READ','UPDATE','DELETE'];
var resultados = ['EXITOSA','ERROR'];

module.exports = {

  create_libro: function (req, res) {
    //Crea libro, no se admiten ISBN repetidos
    var log = '\n'+operacion[0];
    var tiempo_init = new Date;
   var params = req.allParams();
   Libro.create({
     titulo: params.titulo,
     autor: params.autor,
     editorial: params.editorial,
     isbn: params.isbn
   }).exec(function (err, resultado) {
     var tiempo_end = new Date;
     log+='\n\ttiempo_inicio    => '+tiempo_init+' '+tiempo_init.getMilliseconds()
       +'\n\ttiempo_fin       => '+tiempo_end+' '+tiempo_end.getMilliseconds()
       +'\n\ttiempo_total (ms)=> '+(tiempo_end-tiempo_init);
     sails.log.info(log);
     if(err)
       return res.badRequest();
     else return res.json(resultado)
   })
  },

  read_libro: function (req, res) {
    //Busca por titulo 'parecido'
    var log = '\n'+operacion[1];
    var tiempo_init = new Date;
    var params = req.allParams();
    Libro.find({
        titulo: {'contains': params.titulo}
    }).exec(function (err, resultado) {
      var tiempo_end = new Date;
      log+='\n\ttiempo_inicio    => '+tiempo_init+' '+tiempo_init.getMilliseconds()
           +'\n\ttiempo_fin       => '+tiempo_end+' '+tiempo_end.getMilliseconds()
           +'\n\ttiempo_total (ms)=> '+(tiempo_end-tiempo_init);
      sails.log.info(log);
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
    var log = '\n'+operacion[2];
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
      log+='\n\ttiempo_inicio    => '+tiempo_init+' '+tiempo_init.getMilliseconds()
        +'\n\ttiempo_fin       => '+tiempo_end+' '+tiempo_end.getMilliseconds()
        +'\n\ttiempo_total (ms)=> '+(tiempo_end-tiempo_init);
      sails.log.info(log);
      if(err)
        return res.badRequest();
      else
        return res.json(resultado)
    })
  },

  delete_libro: function (req, res) {
    //Elimina un libro por isbn
    var log = '\n'+operacion[3];
    var tiempo_init = new Date;
    var params = req.allParams();
    Libro.destroy({
      isbn: params.isbn
    }).exec(function (err, resultado) {
      var tiempo_end = new Date;
      log+='\n\ttiempo_inicio    => '+tiempo_init+' '+tiempo_init.getMilliseconds()
        +'\n\ttiempo_fin       => '+tiempo_end+' '+tiempo_end.getMilliseconds()
        +'\n\ttiempo_total (ms)=> '+(tiempo_end-tiempo_init);
      sails.log.info(log);
      if(err)
        return res.badRequest();
      else return res.json(resultado)
    })

  }

};

