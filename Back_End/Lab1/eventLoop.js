console.log("Code is starting....");
process.nextTick(()=>{
    console.log("This is process.nextTick operation");
})
setTimeout(()=>{
    console.log("Loading...");
    console.log("Code is ending...")
},1000);
