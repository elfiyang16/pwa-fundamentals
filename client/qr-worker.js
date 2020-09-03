import QrCode from 'qrcode-reader';
import {qrCodeStringToObject} from './utils/qrcode.js'

self.onmessage = e=>{
  // console.log(e.data)
  let imageBuffer= e.data
  let qr = new QrCode();
  qr.callback = function(error, rawResult) {
    if(error) {
      self.postMessage({ error });
      return;
    }
    let result = qrCodeStringToObject(rawResult.result);
    self.postMessage({data:result}) //alternative to Promise
    // resolve(result);
  }
  qr.decode(imageBuffer);
}