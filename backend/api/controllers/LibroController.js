/**
 * LibroController
 *
 * @description :: Server-side logic for managing libroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create_libro: function (req, res) {
    //Crea libro, no se admiten ISBN repetidos
   var params = req.allParams()
   Libro.create({
     titulo: params.titulo,
     autor: params.autor,
     editorial: params.editorial,
     isbn: params.isbn
   }).exec(function (err, resultado) {
     if(err)
       return res.badRequest()
     else return res.json(resultado)
   })
  },

  read_libro: function (req, res) {
    //Busca por titulo 'parecido'
    var params = req.allParams()
    Libro.find({
        titulo: {'contains': params.titulo}
    }).exec(function (err, resultado) {
      if(err)
        return res.badRequest()
      else return res.json(resultado)
    })
  },

  update_libro: function (req, res) {
    //Modifica un libro por isbn
    var params = req.allParams()
    Libro.update({
      isbn:params.isbn
    },{
      titulo: params.titulo,
      autor:params.autor,
      editorial:params.editorial
    }).exec(function (err, resultado) {
      if(err)
        return res.badRequest()
      else
        return res.json(resultado)
    })
  },

  delete_libro: function (req, res) {
    //Elimina un libro por isbn
    var params = req.allParams()
    Libro.destroy({
      isbn: params.isbn
    }).exec(function (err, resultado) {
      if(err)
        return res.badRequest()
      else return res.json(resultado)
    })

  }

};

