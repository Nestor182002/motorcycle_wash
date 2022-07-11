let Production=false
var URL_LOCAL_BASE=`http://localhost:8000`;
var URL_PRODUCTION_BASE=`https://global.herokuapp.com`;

URL_LOCAL_EMPLOYEES = `${URL_LOCAL_BASE}/api/Employees/`;
URL_LOCAL_typeService = `${URL_LOCAL_BASE}/api/typeservice/`;

if(Production == true){
    URL_LOCAL_EMPLOYEES = `${URL_LOCALURL_PRODUCTION_BASE_BASE}/api/Employees/`;
    URL_LOCAL_typeService = `${URL_PRODUCTION_BASE}/api/typeservice/`;
}

// get employee
async function EmployeesList(API_URL) {
    let table=document.getElementById("Employee")
    let urls = API_URL

    const response = await fetch(urls);
    const data= await response.json()

    data.results.forEach(element => {
        table.innerHTML +=`
        <option value="${element.pk}"> ${element.name}</option>        
        `
    });

  }
// get services
async function typeServiceList(API_URL,searchs="",pagination=1) {
    let table=document.getElementById("Services")
    let urls = API_URL
    const response = await fetch(urls);
    const data= await response.json()

    data.results.forEach(element => {
        table.innerHTML +=`
        <option value="${element.pk}">  ${element.description}</option>       
        
        `
    });

  }
// load pages
EmployeesList(URL_LOCAL_EMPLOYEES)
typeServiceList(URL_LOCAL_typeService);

// var inputs
let name_vehichle = document.getElementById("id_vehicle");
let name_Employee = document.getElementById("Employee");
let name_Services = document.getElementById("Services");

// modals
var OpenModal = false
let modals = document.getElementById("modals");
let closed = document.getElementById("close");
let addService = document.getElementById("addservices");

const modalOp = async () => {
  if (OpenModal != true) {
      modals.style.display = "none";
  }else{
      modals.style.display = "flex";
  }  

};
// eventos modal add
addService.addEventListener("click",(e)=>{

  e.preventDefault()
  name_vehichle.disabled = true;
  name_Employee.disabled = true;
  name_Services.disabled = true;

  if(name_vehichle.value == "" || name_Employee.value == "false" || name_Services.value == "false"){
    alert("Por favor complete los campos para continuar")
    name_vehichle.disabled = false;
    name_Employee.disabled = false;
    name_Services.disabled = false;
  }else{
    OpenModal = true;
    modalOp();
  }

});

// eventos modal close
closed.addEventListener("click",()=>{
  name_vehichle.disabled = false;
  name_Employee.disabled = false;
  name_Services.disabled = false;
  OpenModal = false;
  modalOp();
});

// add services
let addServiceSubmit = document.getElementById("addservices");

addServiceSubmit.addEventListener("click",()=>{
  console.log(name_vehichle.value)
  console.log(name_Employee.value)
 console.log(name_Services.value)
})
