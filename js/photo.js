const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'heic'];
const AVATAR = 'img/muffin-grey.svg';

const fileChosserAvatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const fileChoserImages = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');


const checkFileType = (file) => FILE_TYPES.some((it) => file.name.toLowerCase().endsWith(it));

const onAvatarChange = (fileChooser) => {
  if(fileChooser.files.length){
    const file = fileChooser.files[0];

    if (checkFileType(file)) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  }
};

const onImagesChange = (fileChooser) => {
  if(fileChooser.files.length){
    const file = fileChooser.files[0];

    if (file && checkFileType(file)) {

      if(imagesPreview.childNodes.length){
        imagesPreview.childNodes[0].remove();
      }

      const img = document.createElement('img');
      img.style.width = '100%';
      img.style.height = '100%';
      img.src = URL.createObjectURL(file);
      imagesPreview.appendChild(img);
    }
  }
};

fileChosserAvatar.addEventListener('change', (evt) => onAvatarChange(evt.target));


fileChoserImages.addEventListener('change', (evt) => onImagesChange(evt.target));


const resetPhotoPreview = () => {
  avatarPreview.src = AVATAR;
  imagesPreview.innerHTML = '';
};

export {resetPhotoPreview};
