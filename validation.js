const koszyk = document.getElementById("koszyk");
const inputNazwaProduktu = document.getElementById("nazwaProduktu");
const divErrorNazwaProduktu = document.getElementById("nazwaProduktuError");
const inputKodProduktu = document.getElementById("kodProduktu");
const divErrorkodProduktu = document.getElementById("kodProduktuError");
const inputCenaNetto = document.getElementById("cenaNetto");
const divErrorCenaNetto = document.getElementById("cenaNettoError");
const inputVatProdukt = document.getElementById("vatProdukt");
const divErrorVatProdukt = document.getElementById("vatProduktError");
const inputCenaBrutto = document.getElementById("cenaBrutto");
const divErrorCenaBrutto = document.getElementById("cenaBruttoError");
const categoryProductsBox = document.getElementById("categoryProduct");
const categoryProductErrorBox = document.getElementById("categoryProductError");
const classInput1 = [...document.querySelectorAll(".custom-control-input")];
const classInput2 = [...document.querySelectorAll(".custom-control-input1")];
const divErrorCheckBox1 = document.getElementById("checkBoxError1");
const divErrorCheckBox2 = document.getElementById("checkBoxError2");
const btnDodaj = document.getElementById("btn-dodaj");
const zdjecieProduktu = document.getElementById("zdjecieProduktu");
const zdjecieProduktuError = document.getElementById("zdjecieProduktuError");


let statusValidation = false;

koszyk.addEventListener("click", e => {
  e.preventDefault();
  console.log("click koszyk");
});

const validationStart = (poleInput, poleError) => {
  poleInput.classList.remove("is-valid");
  poleError.classList.remove("valid-feedback");
  poleError.innerHTML = " ";
  poleInput.classList.remove("is-invalid");
  poleError.classList.remove("invalid-feedback");
};

function validationError(poleInput, poleError) {
  poleInput.classList.remove("is-valid");
  poleError.classList.remove("valid-feedback");
  poleError.innerHTML = "za długi text";
  poleInput.classList.add("is-invalid");
  poleError.classList.add("invalid-feedback");
}

function validationTrue(poleInput, poleError) {
  poleInput.classList.remove("is-invalid");
  poleError.classList.remove("invalid-feedback");
  poleError.innerHTML = " ";
  poleInput.classList.add("is-valid");
  poleError.classList.add("valid-feedback");
}

//nazwa produktu
function nazwaWalidacja() {

  var tmpValue = inputNazwaProduktu.value;
  statusValidation = false;

  if (tmpValue.length == 0) {
    validationStart(inputNazwaProduktu, divErrorNazwaProduktu);
  } else {
    let regName = /^[a-zA-Z]{3,10}$/;
    if (!regName.test(tmpValue)) {
      validationError(inputNazwaProduktu, divErrorNazwaProduktu);
      statusValidation = false;
    } else {
      validationTrue(inputNazwaProduktu, divErrorNazwaProduktu);
      statusValidation = true;
    }
  }
}

//kod produktu
function kodWalidacja() {
  var tmpValue = inputKodProduktu.value;
  statusValidation = false;
  if (tmpValue.length == 0) {
    validationStart(inputKodProduktu, divErrorkodProduktu);
  } else {
    let regName = /^[a-zA-Z0-9]{2}\-[a-zA-Z0-9]{2}$/gm;

    if (!regName.test(tmpValue)) {
      validationError(inputKodProduktu, divErrorkodProduktu);
      statusValidation = false;
    } else {
      validationTrue(inputKodProduktu, divErrorkodProduktu);
      statusValidation = true;
    }
  }
}

//cena netto
function nettoWalidacja() {
  let tmpValue = inputCenaNetto.value;
  statusValidation = false;
  if (tmpValue.length == 0) {
    validationStart(inputCenaNetto, divErrorCenaNetto);
  } else {
    //let regName = /^[0-9]{1,10}.[0-9]{1,2}$/gm;
    //let reg = /^[0-9]{1,10}$/gm;
    if (tmpValue.includes(".") || tmpValue.includes(",")) {
      validationTrue(inputCenaNetto, divErrorCenaNetto);
      statusValidation = true;
    } else if (!tmpValue.includes(".") || !tmpValue.includes(",")) {
      validationTrue(inputCenaNetto, divErrorCenaNetto);
      statusValidation = true;
      inputCenaNetto.value = tmpValue + ".00";
    }
    if (tmpValue.length > 10) {
      validationError(inputCenaNetto, divErrorCenaNetto);
      statusValidation = false;
    }
  }
}

//stawka VAT
function vatWalidacja() {
  var tmpValue = inputVatProdukt.value;
  statusValidation = false;
  if (tmpValue.length == 0) {
    validationStart(inputVatProdukt, divErrorVatProdukt);
  } else {
    if (tmpValue.length > 2) {
      validationError(inputVatProdukt, divErrorVatProdukt);
      statusValidation = false;
    } else {
      validationTrue(inputVatProdukt, divErrorVatProdukt);
      statusValidation = true;
    }
  }
}

//cena brutto
function vatOblicz() {
  let tmpNetto = inputCenaNetto.value;
  let tmpVat = inputVatProdukt.value;


  if ((tmpVat != null) && (tmpNetto != 0)) {

    let brutto = (tmpNetto * (1 + tmpVat)) / 100;

    if (brutto == 0) {
      statusValidation = false;
      return;
    }
    inputCenaBrutto.value = brutto + ".00";

    validationTrue(inputCenaBrutto, divErrorCenaBrutto);
    statusValidation = true;
  } else {
    statusValidation = false;
    inputCenaBrutto.value = " ";

    if (inputCenaBrutto.length == null) {
      validationStart(inputCenaBrutto, divErrorCenaBrutto);
    }
    return;

  }



}

function categoryProducts() {
  var checkProdukt =
    categoryProductsBox.options[categoryProductsBox.selectedIndex].text;
  statusValidation = false;
  console.log(categoryProductsBox.selectedIndex);

  if (
    categoryProductsBox.selectedIndex == "1" ||
    categoryProductsBox.selectedIndex == "2" ||
    categoryProductsBox.selectedIndex == "3"
  ) {
    validationTrue(categoryProductsBox, categoryProductErrorBox);
    statusValidation = true;
  } else {
    categoryProductsBox.classList.remove("is-valid");
    categoryProductErrorBox.classList.remove("valid-feedback");
    categoryProductErrorBox.innerHTML = "nie wybrano zadnej opcji";
    categoryProductsBox.classList.add("is-invalid");
    categoryProductErrorBox.classList.add("invalid-feedback");
    statusValidation = false;
  }
}


let newVar1 = 0;

function checkBox() {

  let count;

  for (count = 0; count < classInput1.length; count++) {
    if (classInput1[count].checked == true) {
      newVar1 += 1;
      console.log(classInput1[count].value);
    }
  }

  if (newVar1 <= 1) {
    divErrorCheckBox1.innerHTML = "Proszę o zaznaczenie dwoch lub więcej";
    return;
  } else {
    divErrorCheckBox1.innerHTML = "";

  }
}
let newVar2 = 0;

function checkBoxScore() {

  let count;

  for (count = 0; count < classInput2.length; count++) {
    if (classInput2[count].checked == true) {
      newVar2 += 1;
      console.log(classInput2[count].value);
    }
  }

  if (newVar2 >= 2) {
    divErrorCheckBox2.innerHTML = "Może zaznaczyć tylko jedna opcje";
    return false;
  } else {
    divErrorCheckBox2.innerHTML = "";
  }
}

//zdjeecie produktu
function zdjecieWalidacja() {

  var tmpValue = zdjecieProduktu.value;
  statusValidation = false;

  if (tmpValue.length == 0) {
    validationStart(zdjecieProduktu, zdjecieProduktuError);
  } else {
    if (tmpValue.length >= 30) {
      validationError(zdjecieProduktu, zdjecieProduktuError);
      statusValidation = false;
    } else {
      validationTrue(zdjecieProduktu, zdjecieProduktuError);
      statusValidation = true;
    }
  }
}

btnDodaj.addEventListener("click", e => {

  if (inputNazwaProduktu.value == "") {
    statusValidation = false;
    divErrorNazwaProduktu.innerHTML = "<span style='color:red'>Podaj nazwe produktu </span>";
  }
  if (inputKodProduktu.value == "") {
    statusValidation = false;
    divErrorkodProduktu.innerHTML = "<span style='color:red'>Podaj kod produktu </span>";

  }
  if (inputCenaNetto.value == "") {
    statusValidation = false;
    divErrorCenaNetto.innerHTML = "<span style='color:red'>Podaj cene netto </span>";
  }
  if (inputVatProdukt.value == "") {
    statusValidation = false;
    divErrorVatProdukt.innerHTML = "<span style='color:red'>Podaj VAT produktu </span>";

  }
  if (inputCenaBrutto.value == "") {
    statusValidation = false;
    divErrorCenaBrutto.innerHTML = "<span style='color:red'>Podaj cene brutto </span>";

  }
  if (categoryProductsBox.value == "Wybierz kategorie") {
    statusValidation = false;
    categoryProductError.innerHTML = "<span style='color:red'>Nie wybrano zadnej opcji</span>";
  }

  if (newVar1 <= 2) {
    statusValidation = false;
    divErrorCheckBox1.innerHTML = "<span style='color:red'>Nie wybrano zadnej opcji</span>";
  }

  if (newVar2 == 0) {
    divErrorCheckBox2.innerHTML = "<span style='color:red'>Nie wybrano zadnej opcji</span>";
  }

  if (zdjecieProduktu.value == "") {
    statusValidation = false;
    zdjecieProduktuError.innerHTML = "<span style='color:red'>Podaj zdjecie produktu </span>";
  }

});




  if (statusValidation) {
    document.getElementById('validationTrue').innerHTML = "<span style='color:green'>Poprawna walidacja danych</span>";
  } else {
    document.getElementById('validationTrue').innerHTML = "";
    console.log(statusValidation);

  }