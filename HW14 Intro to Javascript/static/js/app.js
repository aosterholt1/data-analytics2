
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $searchBtn = document.querySelector("#search");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");


$searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredTable = data;

function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredTable.length; i++) {
   
    var address = filteredTable[i];
    console.log(address)
    var fields = Object.keys(address);
   
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {

  var filterDate = $dateInput.value;

  if (filterDate != "")
  {
    filteredTable = data.filter(function(address) 
    {
      var addressDate = address.datetime; 
        
    return addressDate === filterDate;
    });
  }
  else {filteredTable};
  
renderTable();

}

renderTable();

$(document).ready(function() {
  $('#table').DataTable();})