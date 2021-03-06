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
const sortedTableBox = document.getElementById("sortedTable");
const myTable = document.getElementById("myTable");
const dodajProduktBtn = document.getElementById("btn-dodaj");
const curierBox = document.getElementById("curier");
const buyCart = document.getElementById("buyCart");
const myTableNew = document.getElementById("myTableNew");


let statusValidation = false;


// koszyk.addEventListener("click", e => {
//   e.preventDefault();
//   console.log("click koszyk");

// });


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
  //console.log(categoryProductsBox.selectedIndex);

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


let countElements = 0;
let testLen = "";

function checkBox() {

  testLen = "";
  let count;
  
  for (count = 0; count < classInput1.length; count++) {
    if (classInput1[count].checked == true) {
      countElements += 1;
      testLen += classInput1[count].value + ', ';
    }
  }
  testLen = testLen.slice(0, testLen.length - 2);

  if (countElements <= 1) {
    //divErrorCheckBox1.innerHTML = "Proszę o zaznaczenie dwoch lub więcej";
    return;
  } else {
    divErrorCheckBox1.innerHTML = "";

  }
}

let newVar2 = 0;
let degreesProduct;

function checkBoxScore() {

  let count;

  for (count = 0; count < classInput2.length; count++) {
    if (classInput2[count].checked == true) {
      newVar2 += 1;
      //console.log(classInput2[count].value);
      degreesProduct = classInput2[count].value;
      }
  }

  if (newVar2 >= 2) {
    //divErrorCheckBox2.innerHTML = "Może zaznaczyć tylko jedna opcje";
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

function addProduct(){

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

  if (countElements <= 2) {
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

  if(!statusUpdata){
  //sprawdzanie czy nie ma takiego samego w elementu w tablicy po nazawie
  let table = document.getElementById('myTable');
  for (let i = 1; i < table.rows.length; i++) {
      let firstCol = table.rows[i].cells[0]; //first column
      if (document.getElementById('myTable').rows[i].cells[0].textContent.toLowerCase() === inputNazwaProduktu.value.toLowerCase()) {
        statusValidation = false;
        alert("Jest już taki przedmiot w tablicy.");
        
      }
    }
  }
  if (statusValidation) {
    //document.getElementById('validationTrue').innerHTML = "<span style='color:green'>Poprawna walidacja danych</span>";


    var row = '<tr><td>'+ inputNazwaProduktu.value +'</td><td>' + inputKodProduktu.value + '</td><td>' + inputCenaNetto.value + '</td><td>' + inputVatProdukt.value + '</td><td>' + inputCenaBrutto.value + '</td><td>' + categoryProductsBox.value + '</td><td>'+ testLen +'</td><td>'+ degreesProduct +'</td><td>'+ zdjecieProduktu.value +'</td><td>'+ '<button type="button" class="remove" title="Remove this row">X</button>' +'</td><td>'+ '<button type="button" onclick="updateTable(this)">🖊</button>' +'</td><td class="use-local-storage">' + '<button type="button">🛒</button>' + '</td></tr>';
    $row = $(row),

    // console.log(row);
    btnDodaj.innerText = "Dodaj produkt";
    clear();


    resort = true;
  $('#myTable')
    .find('tbody').append($row)
    .trigger('addRows', [$row, resort]);
  //return false;

  

  } else {
    document.getElementById('validationTrue').innerHTML = "";
    //console.log('koniec' + statusValidation);

  }

};

//czyszczenie pół
function clear(){

  inputNazwaProduktu.value = "";
 validationStart(inputNazwaProduktu, divErrorNazwaProduktu);
 inputKodProduktu.value = "";
 validationStart(inputKodProduktu, divErrorkodProduktu);
 inputCenaNetto.value = "";
 validationStart(inputCenaNetto, divErrorCenaNetto);
 inputVatProdukt.value = "";
 validationStart(inputVatProdukt, divErrorVatProdukt);
 inputCenaBrutto.value = "";
 validationStart(inputCenaBrutto, divErrorCenaBrutto);
 categoryProductsBox.selectedIndex = "";
 categoryProductsBox.classList.remove("is-valid");
 categoryProductErrorBox.classList.remove("valid-feedback");

 
 for (count = 0; count < classInput1.length; count++) {
  if (classInput1[count].checked) {
    classInput1[count].checked = false;
  }
}
countElements = 0;
for (count = 0; count < classInput2.length; count++) {
  if (classInput2[count].checked) {
    classInput2[count].checked = false;
  }
}
newVar2 = 0;
 divErrorCheckBox1.value = "";
 divErrorCheckBox2.value = "";
 btnDodaj.value = "";
 zdjecieProduktu.value = "";
 validationStart(zdjecieProduktu, zdjecieProduktuError);
 
}

//sortowanie po wyznaczoncyh kryteriach

function sortedTableBy() {
  var checkProdukt =
    sortedTableBox.options[sortedTableBox.selectedIndex].text;

  switch (sortedTableBox.value) {
    case "1":
    $("#myTable").trigger("sorton", [ [[2,0]] ]);
      break;
    case "2":
    $("#myTable").trigger("sorton", [ [[2,1]] ]);
      break;
    case "3":
    $("#myTable").trigger("sorton", [ [[7,0]] ]);
      break;
    case "4":
    $("#myTable").trigger("sorton", [ [[7,1]] ]);
      break;
    case "5":
    $("#myTable").trigger("sorton", [ [[0,0]] ]);
      break;
    case "6":
    $("#myTable").trigger("sorton", [ [[0,1]] ]);
      break;
  }

}

    // usuwanie wiersza

    $('#myTable').delegate('button.remove', 'click' ,function() {
      var t = $('table');
      $(this).closest('tr').remove();
      t.trigger('update');

      alert("Poprawnie usunięto produkt z tablicy.");

      return false;
    });

    //usuwanie do edycji
    $('#myTable').delegate('button.delete', 'click' ,function() {
      var t = $('table');
      $(this).closest('tr').remove();
      t.trigger('update');

      return false;
    });

    //edytowanie wiersza
    
    const btnUpdata = document.getElementById("btnUpadata");
    let opisValue = "";
    var splitValuesOpis = "";
    let statusUpdata = false;
    let index;
    let row_index = 0;
    let row_indexTmp = 0;
    
    function updateTable(index) {

      clear();

      console.log($(this).closest('td').parent());
      

      $('td').click(function(){
         row_index = $(this).parent().index() + 1;
        console.log(row_index);
        
        statusUpdata = true;
        btnDodaj.innerText = "Edycja";
        btnDodaj.onclick = function() { addProductUpdate() };
        checkBox();
        checkBox();
        checkBox();
        checkBoxScore();
      
        inputNazwaProduktu.value = myTable.rows[row_index].cells[0].innerHTML;
        inputKodProduktu.value = myTable.rows[row_index].cells[1].innerHTML;
        inputCenaNetto.value = myTable.rows[row_index].cells[2].innerHTML;
        inputVatProdukt.value = myTable.rows[row_index].cells[3].innerHTML;
        inputCenaBrutto.value = myTable.rows[row_index].cells[4].innerHTML;
        categoryProductsBox.value = myTable.rows[row_index].cells[5].innerHTML;

        //zamiana komórki opis protuktu na podedynczne wartośći
        opisValue = document.getElementById("myTable").rows[row_index].cells[6].innerHTML;
        splitValuesOpis = opisValue.split(', ');
        classInput1.forEach(element => {
          for (let i = 0; i <= splitValuesOpis.length; i++) {
              if (element.value == splitValuesOpis[i]) {
                element.checked = true;
              }
          }
        });

        //ocena produktu
        classInput2.forEach(element => {
          if (element.value == myTable.rows[row_index].cells[7].innerHTML) {
              element.checked = true;
          }
          
        });

        zdjecieProduktu.value = myTable.rows[row_index].cells[8].innerHTML;

       
     });

    };


/*

    wziąść wartość ocena opis produktu rozdzielić ją na poszczególne wartości, przeleciąć i sorawdzać z value jeślo są równe to zmieniacć checked na true
    po wciśnięciu edycja flaga jet ustawiona na edycje , to pomożę w ominięciu sptawdzania czy pole o tej nazwie jest juz w tabeli


    w forze append

    selcet o przesyłce (2 firmy)
    ilość sztuk (suma za) input type numer, minumum value = 1, 
    jak zamykamy local storge to nie 

    zmiana widoku
  */

function loaderProduct() {
  var productsJSON = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/products.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
productsJSON.forEach(function(object) {

var row = '<tr><td>'+ object.nazwa +'</td><td>' + object.kod + '</td><td>' + object.netto + '</td><td>' + object.vat + '</td><td>' + object.brutto + '</td><td>' + object.kategoria + '</td><td>'+ object.opis +'</td><td>'+ object.ocena +'</td><td>'+ object.zdjecie +'</td><td>'+ '<button type="button" class="remove" title="Remove this row">X</button>' +'</td><td>'+ '<button type="button" onclick="updateTable(this)" title="Upadata this row">🖊</button>' + '</td><td class="use-local-storage">' + '<button type="button">🛒</button>' + '</td></tr>';
$row = $(row),

clear();

resort = true;
$('#myTable')
.find('tbody').append($row)
.trigger('addRows', [$row, resort]);
return false;

});

}




function addProductUpdate(){

  checkBox();
  checkBox();
  checkBox();
checkBoxScore();

    var row = '<tr><td>'+ inputNazwaProduktu.value +'</td><td>' + inputKodProduktu.value + '</td><td>' + inputCenaNetto.value + '</td><td>' + inputVatProdukt.value + '</td><td>' + inputCenaBrutto.value + '</td><td>' + categoryProductsBox.value + '</td><td>'+ testLen +'</td><td>' + degreesProduct +'</td><td>'+ zdjecieProduktu.value +'</td><td>'+ '<button type="button" class="remove" title="Remove this row">X</button>' +'</td><td>'+ '<button type="button" onclick="updateTable(this)" title="Upadata this row">🖊</button>' +'</td><td class="use-local-storage">' + '<button type="button">🛒</button>' + '</td></tr>';
    $row = $(row),

    btnDodaj.innerText = "Dodaj produkt";

    clear();

    resort = true;
  $('#myTable')
    .find('tbody').append($row)
    .trigger('addRows', [$row, resort]);
  //return false;
 
  var t = $('#myTable tr').eq(row_index).remove();
  
  t.trigger('update');

  return false;
};

//dodanie produktu do koszyka localStorage

let arrayKoszyk = [];

$("td.use-local-storage").on('click', function(event){

  console.log('dodaj do koszyka');
  
  row_index = $(this).parent().index() + 1; // pobrany index wiersza

  if(row_index != row_indexTmp){
    const ob = {
      'nazwa': myTable.rows[row_index].cells[0].innerHTML,
      'cena_brutto': myTable.rows[row_index].cells[4].innerHTML
    };
  
    arrayKoszyk.push(ob);
  
   localStorage.setItem('myElement', JSON.stringify(arrayKoszyk));

   var row = '<tr><td>'+ ob.nazwa +'</td><td class="costProduct">' + ob.cena_brutto + '</td><td>'+ '<input onchange="calculationCart()" type="number" name="quantity" value="1" min="1" max="10">' + '</td></tr>';
    $row = $(row),
    
    resort2 = true;
    $('#myTable2')
    .find('tbody').append($row)
    .trigger('addRows', [$row, resort2]);
    
    calculationCart();


  }
  row_indexTmp = row_index;
  

});

//pokazanie koszyka
let tableInCart = document.getElementById("myTable2").getElementsByTagName('tbody')[0];
let tableInCart2 = document.getElementById("myTable2");
let allProductsCost = 0;
let allCost = 0;
let costCurier = 0;
let inCartProducts = [];
let valueProductsInCart = [];




const allProductInput = document.getElementById('allProducts');
const costCurierInput = document.getElementById('costCurier');
const allCostInput = document.getElementById('costAll');


function calculationCart() {

  allProductsCost = 0;
  
inCartProducts = [...document.getElementsByName('quantity')];
valueProductsInCart = [...document.getElementsByClassName('costProduct')];
  
for(var i = 0; i < inCartProducts.length; i++)
{
  let tmpCostOneProduct = inCartProducts[i].value * valueProductsInCart[i].innerHTML;
  allProductsCost += tmpCostOneProduct;
  
}
allProductInput.value = allProductsCost + '.00 zł';
console.log(allProductsCost);

}

function selectedCurier() {
  var checkCurier =
  curierBox.options[curierBox.selectedIndex].text;

  switch (curierBox.value) {
    case "15":
    console.log(curierBox.value);
    costCurierInput.value = curierBox.value + '.00 zł';
      break;
    case "12":
    costCurierInput.value = curierBox.value + '.00 zł';
      break;
    case "0":
    costCurierInput.value = curierBox.value + '.00 zł';
      break;

  }

  allCostInput.value = (parseFloat(allProductsCost) + parseFloat(curierBox.value)).toFixed(2) + ' zł';

}

function finishShopping() {

  localStorage.removeItem('myElement');
  alert("Twoje zamówienie zostało przekazane do realizacji");
}

let changeView = false;
const elements = document.getElementsByClassName("photoNew");
const countRowInTable = document.getElementById('myTable').getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;


function loadNewView(){
  console.log("załaduj nowy widok");

  myTable.style.display = 'none';
  myTableNew.style.display = 'grid'
//

addItem();
  

  if (changeView) {
    myTable.style.display = 'block';
  myTableNew.style.display = 'none'
  changeView = false;
  var elements = document.getElementsByClassName('grid-item');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  return; 
  }

  changeView = true;
}

function addItem() {
  
  for (let i = 0; i < countRowInTable ; i++) {
    
    var elem = document.createElement("img");
    elem.setAttribute("src", "/nophotos.jpg");
   elem.setAttribute("height", "250");
    let div = document.createElement("div");

    div.innerHTML = 'Nazwa produktu : ' +  myTable.rows[i+1].cells[0].innerHTML +'<br/>Cena produktu : ' + myTable.rows[i+1].cells[2].innerHTML +' zł<br/>Cena brutto ' +'('+ myTable.rows[i+1].cells[4].innerHTML + ' zł)';


  div.classList.add("grid-item");
  div.appendChild(elem);

myTableNew.appendChild(div);

  }

}