//import {strearesult} from './script.js'

console.log('Welcome to homepage');

const test =(a)=>{
  return a;
}
document.addEventListener("click",function(){
  if(location.pathname=='/home'){
      const result=test;
      console.log('Homepage Result',result);
      const parentVideos = document.getElementById('captureStreams');
      const video = document.createElement('video');
      video.srcObject = result;
      video.play();
      parentVideos.append(video);
  }
})
export {test};

           
            
            