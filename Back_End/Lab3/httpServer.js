import http from "http"

const server = http.createServer((req, resp)=>{
    const url = req.url;
    const meth = req.method;
    if(url == "/msg" && meth == "GET"){
        resp.write("Hello World!!");
        resp.end();
    }
   
   resp.end();
});
const port = 3000;
server.listen(port , ()=>{
        console.log(`server is running on port num ${port}.....`);
        return;
});

