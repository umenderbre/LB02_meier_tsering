function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}


function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} ist erforderlich`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const name = document.getElementById('name');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

var checkPasswordValidity = function() {
  if (password.value != confirm.value) {
    confirm.setCustomValidity('Passwort stimmt nicht überein!');
  } else {
    confirm.setCustomValidity('');
  }
};

password.addEventListener('change', checkPasswordValidity);
confirm.addEventListener('change', checkPasswordValidity);


function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
        `${getFieldName(input)} muss mindestens ${min} Zeichen betragen`
    );
  } else if (input.value.length > max) {
    showError(input,
        `${getFieldName(input)} muss kleiner als ${max} Zeichen sein`
    );
  } else {
    showSuccess(input);
  }
}



function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
  if(!checkRequired([firstname, name, email, mobile, password, confirm])){
    checkLength(firstname, 3, 20);
    checkLength(name, 3, 20);
    checkLength(password, 8, 20);
    checkLength(confirm, 8, 20);
    checkEmail(email);
  }
}


form.addEventListener('submit', function(e) {
  e.preventDefault();
  validateForm();
});
