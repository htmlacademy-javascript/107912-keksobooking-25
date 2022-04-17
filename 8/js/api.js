const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess, onFail)=>
  fetch(
    GET_DATA_URL,
    {method: 'GET'}
  ).then((response)=>{
    if(response.ok){
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data)=>{
    onSuccess(data);
  }).catch((err)=>{
    onFail(err);
  });

const sendData = (onSuccess, onError, sendForm)=>{
  const SEND_DATA_URL = sendForm.action;
  const formData = new FormData(sendForm);
  return fetch(
    SEND_DATA_URL,
    {
      method:'POST',
      credentials: 'same-origin',
      body: formData
    }
  ).then((response) => {
    if(response.ok){
      onSuccess();
    } else {
      onError();
    }
  }).catch(
    ()=>onError()
  );
};


export{getData, sendData};
