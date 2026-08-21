// import {EventEmitter }from "nodes:events"

// function createDomElements() {
//     const emitter=new EventEmitter();
//     return {
//         addEventListener(eventType,listener){
//             emitter.on(eventType,listener);
//         },
//         removeEventListener(eventType,listener){
//             emitter.off(eventType,listener);
//         },
//         dispatchEvent(event){
//             event.target=this;
//             event.currentTarget=this;
//             emitter.emit(event.eventType,event);
//         }
//     }
// }
// const button=createDomElements();
// button.addEventListener('save', ()=>{
//     console.log("saving...");
// })
// button.addEventListener('click', handleClick);
// button.dispatchEvent({
//   eventType:"save"
// });
// button.dispatchEvent({
// eventType:"click",
// detail: "this is the click dispatcher"
// });
import {EventEmitter }from "node:events"

function createDomElements() {
    const emitter=new EventEmitter();
    return {
        addEventListener(eventType,listener){
            emitter.on(eventType,listener);
        },
        removeEventListener(eventType,listener){
            emitter.off(eventType,listener);
        },
        dispatchEvent(event){
            event.target=this;
            event.currentTarget=this;
            emitter.emit(event.eventType,event);
        }
    }
}
const button=createDomElements();
button.addEventListener('save', ()=>{
    console.log("saving...");
})
button.addEventListener('submit',()=>{
    console.log("Data submitted successfully");
})
function handleClick(event){
    console.log("button clicked");
    console.log(event.detail);
}
button.addEventListener('click', handleClick);
button.dispatchEvent({
  eventType:"save"
});
button.dispatchEvent({
  eventType:"submit"
});
button.dispatchEvent({
eventType:"click",
detail: "this is the click dispatcher"
});