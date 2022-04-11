const form = document.querySelector('.ad-form');
const selectedType = form.querySelector('#type');
const priseField = form.querySelector('#price');
const priseSlider = form.querySelector('#slider'); //<div> слайдера
const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');
const selectedRoom = form.querySelector('#room_number');
const selectedGuest = form.querySelector('#capacity');


console.log(typeof(selectedRoom.value));


const pristine = new Pristine(form,
  {
    classTo: 'ad-form__element',  // Элемент, на который будут добавляться классы
//    errorClass: 'has-danger', // Класс, обозначающий невалидное поле
//    successClass: 'has-success', // Класс, обозначающий валидное поле
    errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
    errorTextTag: 'p', // Тег, который будет обрамлять текст ошибки
    errorTextClass: 'prestine__error-text' // Класс для элемента с текстом ошибки
  },
  true);


const minPriselist =
{
  'bungalow' : [0,'бунгало'],
  'flat' : [1000,'квартиру'],
  'hotel' : [3000,'отель'],
  'house' : [5000,'дом'],
  'palace' : [10000,'дворец']
};


const validatePrise=(valuePrise) => {
  const minPrise = minPriselist[selectedType.value][0];
  return minPrise <= valuePrise; //&& valuePrise <= 100000
};

const getPriseErrorMessage=() => {
  const minPrise = minPriselist[selectedType.value][0];
  const ruTypeName = minPriselist[selectedType.value][1];
  return `Минимальная цена за ${ruTypeName}: ${minPrise}р.`;
};

pristine.addValidator(priseField, validatePrise, getPriseErrorMessage);

function typeBuildingChange(evt){
  const minPrise = minPriselist[evt.target.value][0];
  priseField.placeholder = `от ${minPrise}`;
  priseField.min = minPrise;

  priseSlider.noUiSlider.set(minPrise);

  //priseField.dataset.pristineMinMessage = `Минимальная цена ${ruTypeName}: ${minPrise}р.`; //атрибут data-pristine-min-message в <input id="prise">
  //priseField.setAttribute('data-pristine-min-message',`Минимальная цена за ${ruTypeName}: ${minPrise}р.`);
  //priseField.setAttribute('data-pristine-my-range',`${minPrise},100000`);
  //  pristine.validate(priseField);
}
selectedType.addEventListener('change',typeBuildingChange);

const validateRoomsGuests = ()=>{
  switch(selectedRoom.value){
    case '100': return selectedGuest.value === '0';
    case '1' : return selectedGuest.value === '1';
    case '2' : return Number(selectedGuest.value) <= 2 && Number(selectedGuest.value);
    case '3' : return Number(selectedGuest.value) <= 3 && Number(selectedGuest.value);
    default : return false;
  }
};

pristine.addValidator(selectedRoom, validateRoomsGuests, 'кол-во комнат не сответствует кол-ву гостей');
//pristine.addValidator(selectedGuest, validateRoomsGuests, 'кол-во комнат не сответствует кол-ву гостей');


noUiSlider.create(priseSlider, {
  start: 0,
  step: 10,
  connect: true,
  range: {
    'min': 0,
    '10%': 500,
    '50%': 4000,
    '70%': 10000,
    'max': 100000
  }
  /*
    format: {
      to: function(value){return value;},
      from: function(value){return parseFloat(value);}
    }*/
});

priseSlider.noUiSlider.on('update', ()=>{
  priseField.value = Math.ceil(priseSlider.noUiSlider.get());
});

priseField.addEventListener('input', (evt)=>{
  priseSlider.noUiSlider.set(evt.target.value);
});

timeinField.addEventListener('change', ()=>{timeoutField.value = timeinField.value;});
timeoutField.addEventListener('change', ()=>{timeinField.value = timeoutField.value;});


/*
pristine.leng = {ru:{
  required: 'Это обязательное поле',
  email: 'Требуется корректный e-mail адрес',
  number: 'Требуется действительное число',
  integer: 'Требуется целое число',
  url: 'Требуется корректный URL',
  tel: 'Требуется корректный номер телефона',
  maxlength: 'Длинна поля дожна быть < ${1}',
  minlength: 'Длинна поля дожна быть > ${1}',
  min: 'Минимальное значение поля ${1}',
  max: 'Максимальное значение поля ${1}',
  pattern: 'Пожалуйста, привидите в соответствии с форматом',
  equals: 'Эти два поля не совпадают'
}};

pristine.setLocale('ru');

pristine.addMessages('ru',
  {
    required: 'Это обязательное поле',
    email: 'Требуется корректный e-mail адрес',
    number: 'Требуется действительное число',
    integer: 'Требуется целое число',
    url: 'Требуется корректный URL',
    tel: 'Требуется корректный номер телефона',
    maxlength: 'Длинна поля дожна быть < ${1}',
    minlength: 'Длинна поля дожна быть > ${1}',
    min: 'Минимальное значение поля ${1}',
    max: 'Максимальное значение поля ${1}',
    pattern: 'Пожалуйста, привидите в соответствии с форматом',
    equals: 'Эти два поля не совпадают'
  }
);*/

/*
const tileInput = form.querySelector('#title');

function validateLabel (value) {
  return value.length >= tileInput.minlength && value.length <= tileInput.maxlength;
}

pristine.addValidator(tileInput, validateLabel);
*/
/*
const pristine = new Pristine(form, {
  classTo: 'form__item', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});
*/

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна ');
  }
//  pristine.reset();
});
