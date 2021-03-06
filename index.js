const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var url  = require('url')
let ObjetosCaracteres = [];


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const url_parts = url.parse(req.url).pathname.split('/')
  url_parts[1] == 'hello' && url_parts[2].startsWith(':') ? 
  ( res.end(JSON.stringify({hello: url_parts[2].substring(1) })) )
  : res.end('Hola Mundo')
  
});


const BuscarIndiceFinal = (arreglo, caracter) => {
  var indice = arreglo.slice().reverse().findIndex(simbolo => simbolo.type === (caracter === ')' ? "p": caracter ===']'? "c" : "ll") && !simbolo.closed);
  var conteo = arreglo.length - 1
  var indice_final = indice >= 0 ? conteo - indice : indice;    
  return indice_final;
}


const VerificarSignos = (texto) =>{

  for( let i = 0; i <texto.length; i++){
    caracter = texto.charAt(i);   
     
    if(caracter=='[' || caracter=='{' || caracter=='('){
      const ObjetoSigno = {openchar: caracter, closed: false, type: caracter === '{' ? "ll" : caracter === '[' ? "c":"p", index : i};
      ObjetosCaracteres.push(ObjetoSigno);0
    }else if(caracter==']' || caracter=='}' || caracter==')'){
      const index = BuscarIndiceFinal(ObjetosCaracteres, caracter);
      ObjetosCaracteres[index].closed = true;
    }      
           
    
  }

let conteo=0
ObjetosCaracteres.forEach( ObjetoCaracter => { !ObjetoCaracter.closed ? (console.log("La cadena contiene un error") , conteo++ ): "" })

console.log( conteo === 0 ? "La cadena no contiene errores" : "La cadena tiene: " + conteo +" errores" );

}

VerificarSignos(process.argv[2])

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});