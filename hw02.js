const http = require('http');
const interval = process.env.INTERVAL || 1000;
const timeout = process.env.TIMEOUT || 20000;
const port = 3000;

console.log('your interval ms: ',interval);
console.log('your timeout ms: ',timeout);

const server = http.createServer().listen(port,()=>{
    console.log(`Please, open your localhost: ${port}`)
});

server.on('request',(request, response)=>{
    
    if (request.method === 'GET' && request.url === '/') {

      const timeInConsole = setInterval(()=>{console.log(getTime());},interval);
      setTimeout(()=>{
        response.end(`${getTime()}`);
          clearInterval(timeInConsole);
      },timeout);
    } else {
      console.log(`Please, use port: ${port}  in your localhost or reload it`);
  }
});

function getTime(){
    let currentDate = new Date(),
        hours = currentDate .getHours(),
        minutes = currentDate .getMinutes(),
        second = currentDate .getSeconds(),
        date = currentDate .getDate(), 
        month = currentDate .getMonth(), 
        year = currentDate .getFullYear(),
        outputDate = `${hours}:${minutes}:${second}  ${date}.0${month}.${year}`; 
    return outputDate;
}
