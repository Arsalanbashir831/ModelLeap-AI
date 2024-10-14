import { atom } from "recoil";


const modelStateParameter = atom({
    key: 'modelStateParameter', 
    default: {
        outputLength: 512,
        temperature: 0.7,
        topP: 0.7,
        topK: 50,
      }, 
  });

export default modelStateParameter