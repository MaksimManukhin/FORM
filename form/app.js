const form = document.forms["form"];
const formArr = Array.from(form);
const validFormArr = [];
const button = form.elements["button"];

formArr.forEach((el) => {
  if (el.hasAttribute("data-reg")) {
    el.setAttribute("is-valid", "0");
    validFormArr.push(el);
  }
});

form.addEventListener("input", inputHandler);
form.addEventListener("submit", formCheck); // обработка кнопки "Отправить"

function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute("data-reg");
  const reg = new RegExp(inputReg);
  if (reg.test(inputValue)) {
    el.setAttribute("is-valid", "1");
    el.style.border = "2px solid rgb(0, 196, 0)";
  } else {
    el.setAttribute("is-valid", "0");
    el.style.border = "2px solid rgb(255, 0, 0)";
  }
}

// Здесь проверяем, можно ли отправить форму
function formCheck(e) {
  e.preventDefault(); // блокируем input
  const allValid = []; // создаем массив валидных значений
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute("is-valid")); // проверяем каждое поле
  });
  const isAllValid = allValid.reduce((acc, current) => {
    // проверяем, чтобы все было правильно
    return acc && current;
  });
  if (!Boolean(Number(isAllValid))) {
    alert("Заполните поля правильно!"); // если не правильно - сообщение пользователю
    return;
  }
  formSubmit(); // если правильно - отправляем данные
}

 async function formSubmit(){
 const data = serializeForm(form)
 const response = await sendData(data);
 if(response.ok){
  let result = await response.json();
  alert(result.message);
  formReset();
 }else{
  alert (`Код response.status`)
 }
}
function serializeForm(formNode){
  return new FormData(form);
}

async function sendData(data){
  return await fetch("send_mail.php",{
    method:"POST",
    body:data,
  })
}
function formReset(){
  form.reset();
}