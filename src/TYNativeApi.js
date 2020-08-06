import{NativeModules,Platform,NativeAppEventEmitter,DeviceEventEmitter,AlertIOS}from"react-native";import{EventEmitter}from"events";const INTERNAL_EVENT_TYPE=["error","newListener","removeListener","dpDataChange","deviceChanged","bluetoothChange","deviceStateChange","networkStateChange","linkageTimeUpdate","deviceLocalStateChange"],type=e=>Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),isEmptyObj=e=>e.constructor===Object&&0===Object.keys(e).length,parseJson=str=>{let result;if(str&&"string"===type(str))try{result=JSON.parse(str)}catch(parseError){try{result=eval(`(${str})`)}catch(e){result=str}}else result=void 0===str?{}:str;return result},formatValue=(e,t)=>{if("string"===type(e)){if("true"===e)return!0;if("false"===e)return!1}else if("undefined"===type(e))switch(t.type){case"bool":return!1;case"value":return t.min;default:return""}return e},formatDevJSON=e=>{let t,i,n,o,a,s;const r=e,{dps:c}=r,v=parseJson(r.schema);r.schema={},r.codeIds={},r.idCodes={},r.state={};for(const e in v)t=(i=v[e]).code,n=`${i.id}`,o=parseJson(i.property),i.dptype=i.type,(i=Object.assign({},i,o)).id=n,r.codeIds[t]=n,r.idCodes[n]=t,a=formatValue(c[n],i),r.state[t]=a,r.schema[t]=i,delete i.property;if(r.panelConfig){s=Object.assign({},r.panelConfig);for(const e in s)r.panelConfig[e]="string"==typeof s[e]?parseJson(s[e]):s[e]}else r.panelConfig={};return r};let AppDeviceEventEmitter={};const Event={},Device={},App={};let Native={},apiRequest;const TYDeviceData={};let TYMobileData={};if(NativeModules){AppDeviceEventEmitter=Platform.select({ios:()=>NativeAppEventEmitter,android:()=>DeviceEventEmitter})();const e=new EventEmitter;e.setMaxListeners(0);const t=["on","once","emit"];t.forEach(t=>{Event[t]=e[t].bind(e)}),Event.fire=e.emit.bind(e),Event.remove=e.removeListener.bind(e),Event.off=function(t){1===arguments.length&&e.removeAllListeners(t),2===arguments.length&&e.removeListener(t,arguments[1])};const{TYRCTPublicModule:i,TYRCTPublicManager:n,TYRCTDeviceModule:o,TYRCTPanelManager:a}=NativeModules,s=i||n,r=o||a;s&&r&&(Native={...s,...r},TYDeviceData.devInfo={},Device.formatDps=(e=>TYDeviceData.devInfo&&TYDeviceData.devInfo.idCodes?Object.keys(e).reduce((t,i)=>{const n=TYDeviceData.devInfo.idCodes[i];return{...t,[n]:e[i]}},{}):{}),Device.setState=((e,t)=>{const i={};if("object"===type(e)){for(let t in e){if(!Device.checkDpExist(t))return;i[t=/^\d+$/.test(t)?Device.getDpCodeById(t):t]=e[t]}if(!isEmptyObj(i)){TYDeviceData.devInfo.state={...TYDeviceData.devInfo.state,...i};for(const e in i)-1===INTERNAL_EVENT_TYPE.indexOf(e)?Object.prototype.hasOwnProperty.call(i,e)&&Event.emit(e,i):console.warn(`DP Code can not be one of [${INTERNAL_EVENT_TYPE}]`)}}else{if(!Device.checkDpExist(e))return;{const n=/^\d+$/.test(e)?Device.getDpCodeById(e):e;i[n]=t,isEmptyObj(i)||(TYDeviceData.devInfo.state={...TYDeviceData.devInfo.state,...i},Event.emit(n,i))}}return i}),Device.getDeviceInfo=(()=>new Promise(e=>{TYDeviceData.devInfo?e(TYDeviceData.devInfo):Device.initDevice().then(t=>{e(t)})})),Device.initDevice=(()=>Promise.all([new Promise(e=>r.getDevInfo({},t=>e(t))),App.getNetworkState()]).then(e=>{const t="undefined"===type(e[1].type)?e[1]:e[1].type;return Device.setDeviceInfo({networkType:t,...e[0]}),TYDeviceData.devInfo})),Device.setDeviceInfo=(e=>{if(e.devId){const t=e;t.deviceOnline=e.isOnline,delete t.isOnline;const i=formatDevJSON({appOnline:"NONE"!==e.networkType,...t});i.isVDevice=e.devId&&0===e.devId.indexOf("vdev"),TYDeviceData.devInfo=i}else TYDeviceData.devInfo={}}),Device.checkDpExist=(e=>Device.getDpIdByCode(e)||Device.getDpCodeById(e)),Device.getDpIdByCode=(e=>{if(TYDeviceData.devInfo){const{codeIds:t}=TYDeviceData.devInfo;return t[e]}}),Device.getDpCodeById=(e=>{if(TYDeviceData.devInfo){const{idCodes:t}=TYDeviceData.devInfo;return t[e]}}),Device.putDeviceData=(e=>new Promise((t,i)=>{const{option:n,...o}=e;let a,s=!0;const c={};for(const e in o)if(Device.checkDpExist(e)){c[/^\d+$/.test(e)?e:Device.getDpIdByCode(e)]=o[e],s=!1}if(s)return i(a={error:"param error"}),void Event.emit("message",a);__DEV__&&console.log("-----数据下发",e,c),r.putDpData({command:c,option:"undefined"===type(n)?3:n},()=>t({success:!0}),e=>{i(e),Event.emit("message",e)})})),Device.isMeshWifiDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{pcc:e}=TYDeviceData.devInfo;return void 0!==e?"0108"===e:e}),Device.isMeshDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{nodeId:e}=TYDeviceData.devInfo;return void 0!==e?e.length>0:e}),Device.isWifiDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{pcc:e}=TYDeviceData.devInfo;return void 0!==e?0===e.length:e}),Device.getBleManagerState=(()=>new Promise((e,t)=>{(r.getBleManagerState||function(){t()})(i=>{if(i)return e(i.state);t()})})),Device.deleteDeviceInfo=(()=>new Promise((e,t)=>{(r.deleteDeviceInfo||function(){t()})(e,t)})),AppDeviceEventEmitter.addListener("deviceDataChange",e=>{Event.emit("deviceDataChange",{type:"dpData",payload:e})}),AppDeviceEventEmitter.addListener("dpDataChange",e=>{if(isEmptyObj(TYDeviceData.devInfo))TYDeviceData.__unInitializeDps=e;else{const t=Device.formatDps(e);isEmptyObj(t)||(__DEV__&&console.log("-----数据上报",t,e),Device.setState(t),Event.emit("deviceDataChange",{type:"dpData",payload:t}))}}),AppDeviceEventEmitter.addListener("deviceChanged",()=>{__DEV__&&console.warn("deviceChanged"),Device.initDevice().then(e=>Event.emit("deviceDataChange",{type:"devInfo",payload:e}))}),AppDeviceEventEmitter.addListener("bluetoothChange",e=>{Event.emit("bluetoothChange",e.state)}),AppDeviceEventEmitter.addListener("deviceStateChange",e=>{__DEV__&&console.warn("deviceStateChange"),void 0!==e&&void 0!==e.state&&Event.emit("deviceDataChange",{type:"deviceOnline",payload:{deviceOnline:e.state}})}),AppDeviceEventEmitter.addListener("networkStateChange",e=>{__DEV__&&console.warn("networkStateChange"),void 0!==e&&void 0!==e.state&&Event.emit("networkStateChange",{appOnline:e.state})}),AppDeviceEventEmitter.addListener("linkageTimeUpdate",()=>{Event.emit("linkageTimeUpdate",{})}),App.verSupported=(e=>!!(s&&s.mobileInfo&&s.mobileInfo.appRnVersion)&&s.mobileInfo.appRnVersion>=e),App.getNetworkState=(()=>new Promise(e=>{s.getNetworkType(t=>{e(t)})})),App.is24Hour=(()=>new Promise(e=>{s.is24Hour(t=>e(t))})),App.getMobileInfo=(()=>new Promise((e,t)=>{TYMobileData?t():s.getMobileInfo(t=>e(t))}).then(e=>TYMobileData=e,()=>TYMobileData)),App.jumpTo=(e=>{s.jumpTo(e||"")}),App.showLoading=(e=>{s.showLoading({title:e||""})}),App.back=(()=>{s.back()}),App.disablePopGesture=(()=>{"ios"===Platform.OS&&r.disablePopGesture()}),App.enablePopGesture=function(){"ios"===Platform.OS&&r.enablePopGesture()},App.showPromptDialog=((e,t,i,n,o,a,r)=>{if("ios"===Platform.OS)try{AlertIOS.prompt(i,n,[{text:e,onPress:e=>a(e),style:"default"},{text:t,onPress:()=>r(),style:"cancel"}],"plain-text",o)}catch(e){}else s.showPromptDialog(i,n,o,a,r)}),apiRequest=(e=>new Promise((t,i)=>{r.apiRNRequest(e,e=>{const i=parseJson(e);t(i)},e=>{const t=parseJson(e);i(t)})})))}const TySdk={mobile:App,device:Device,apiRequest:apiRequest,native:Native,event:Event,DeviceEventEmitter:AppDeviceEventEmitter};if(App&&NativeModules){const e=NativeModules.TYRCTNavManager,t=App.verSupported(5.23)&&e,i="message";class n{constructor(){this.emitter=null,this.subscription=null}createEmitter(){t?this.emitter=new NativeEventEmitter(NativeModules.TYRCTNavManager):console.log("-----AppRnVersion must >= 5.23")}addListener(e){t?this.emitter&&(this.subscription=this.emitter.addListener("receiveBroadcast",e)):console.log("-----AppRnVersion must >= 5.23")}removeEmitter(){t?this.subscription&&this.subscription.remove():console.log("-----AppRnVersion must >= 5.23")}registerEventListener(){t?e.broadcastReceiverRegister(i):console.log("-----AppRnVersion must >= 5.23")}sendEvent(n){t?e.broadcastMessage(i,n):console.log("-----AppRnVersion must >= 5.23")}pushWithUiID(i,n){t?e.pushWithUIID(i,n):console.log("-----AppRnVersion must >= 5.23")}}const o=new n;App.jumpSubPage=((e,t)=>{const{uiId:i}=e;o.pushWithUiID(i,t)})}TySdk.Navigator={},TySdk.applyNavigator=(e=>{TySdk.Navigator=e});export default TySdk;