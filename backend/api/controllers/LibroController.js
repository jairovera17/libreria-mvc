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

/**
 * csv estructure =
 *  ip,operacion,argv,texec,cpu(%),disk-iostat(tps,kB_read,kB_wrtn/s),RAM(usado -m),Network (RX pakts,Tx Pakts)
 * 
 */

function new_log(ip,operacion,argv,tiempo_init,tiempo_end){

  var tiempo_diff = tiempo_end-tiempo_init;
  var log = `${ip},${operacion},${argv},${tiempo_diff}`
  var instrumentos = exec('sh final_script.sh',(error, stdout, stderr)=>{
    fs.appendFile('instrumentos.csv',`${log},${stdout}\n`,
  function(err){
    if(err) throw err;
    });
  });  
}

function loggear(tiempo_init,tiempo_end,operacion_index){

  var tiempo_exec = tiempo_end - tiempo_init;
  var log = '\n'+operacion[operacion_index];



  var instrumentos = exec('sh log_script.sh',(error, stdout, stderr)=>{
    fs.appendFile('logs_data.csv',`${log}
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
     var argv = `titulo=${params.titulo}|autor=${params.autor}|editorial=${params.editorial}|isbn=${params.isbn}`
     new_log(req.ip,operacion[0],argv,tiempo_init,tiempo_end)

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
      var argv = `titulo=${params.titulo}`
      new_log(req.ip,operacion[1],argv,tiempo_init,tiempo_end)
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
      var argv = `titulo=${params.titulo}|autor=${params.autor}|editorial=${params.editorial}|isbn=${params.isbn}`
      new_log(req.ip,operacion[2],argv,tiempo_init,tiempo_end)
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
      var argv = `isbn=${params.isbn}`
      new_log(req.ip,operacion[3],argv,tiempo_init,tiempo_end)
      if(err)
        return res.badRequest();
      else return res.json(resultado)
    })

  },

  get_log: function(req,res){
    fs.readFile('instrumentos.csv',function(err,data){
      if (err){
        res.send('error');
      }
      else {
        res.send(data);
      }
    });
  },

  clear_log: function(req,res){

    fs.writeFile('instrumentos.csv',"ip,operacion,argv,texec,cpu(%),disk-tps,disk-kB_read,disk-kB_wrtn/s),RAM(M),network-Rx-Pakts,network-Tx-Pakts\n",
    function(err){
      if(err) throw err;
      });

      return res.send('log borrado')
  }

};

