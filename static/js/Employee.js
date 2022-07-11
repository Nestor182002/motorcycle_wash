let Production=false
var URL_LOCAL_EMPLOYEES=`http://localhost:8000`
var URL_PRODUCTION_EMPLOYEES=`https://global.herokuapp.com`
if(Production == true){
    URL_LOCAL_EMPLOYEES=URL_PRODUCTION_EMPLOYEES
}

var EMPLOYEES_URL=`${URL_LOCAL_EMPLOYEES}/api/Employees/`

// get employee
async function EmployeesList(API_URL,searchs="",pagination=1) {
    let table=document.getElementById("table")
    let urls = API_URL
    if(searchs != ""){
        urls=`${API_URL}?page=${pagination}&search=${searchs}`
    }
    const response = await fetch(urls);
    const data= await response.json()

    // pagination
    if(data.previous != null){
        document.getElementById("backP").classList.remove("hidden");
        document.getElementById("backP").href=data.previous;
    }else{
        document.getElementById("backP").classList.add("hidden");
    }
    if(data.next != null){
        document.getElementById("nextP").classList.remove("hidden");
        document.getElementById("nextP").href=data.next;
    }else{
        document.getElementById("nextP").classList.add("hidden");
    }

    table.innerHTML = "";
    data.results.forEach(element => {
        table.innerHTML +=`
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            ${element.slug}
        </th>
        <td class="px-6 py-4 ">
            ${element.name}
        </td>
        <td class="px-6 py-4">
            ${element.earnings}
        </td>
        <td class="px-6 py-4 text-right father-edit">
            <a href="#" data-id="${element.pk}" data-name="${element.name}" class="son-edit font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
    </tr>
        
        `
    });

  }

// load pages
EmployeesList(EMPLOYEES_URL)

// pagination
document.getElementById("backP").addEventListener("click",(e)=>{
    e.preventDefault()
    let value=document.getElementById("backP").href
    EmployeesList(value)
})
document.getElementById("nextP").addEventListener("click",(e)=>{
    e.preventDefault()
    let value= document.getElementById("nextP").href.toString()
    EmployeesList(value)
})

// search
let searchInput=document.getElementById("simple-search")
searchInput.addEventListener("keyup",()=>{
    EmployeesList(EMPLOYEES_URL,searchInput.value) 
})

// add employee with modal
var OpenModal = false
let csrfToken=document.getElementsByName("csrfmiddlewaretoken")[0].value

let addEmployee = document.getElementById("addEmployee");
let modals = document.getElementById("modals")
let closed = document.getElementById("close")
// funct api
const ApiEmployees = async (methods,datas,ids) =>{
    jsondata={
        "name":datas,

    }
        const settings = {
            method: methods,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(jsondata)
        };

        if(ids){
            const fetchResponse = await fetch(`${EMPLOYEES_URL}${ids}/`, settings);
            if(fetchResponse.status != 200){
                alert("el empleado no se ha podido editar,intentelo de nuevo.");
                setTimeout(window.location.reload(), 1000);
            }else{
                alert("el empleado ha sido editado")
                setTimeout(window.location.reload(), 1000);
            }
        }else{
            const fetchResponse = await fetch(EMPLOYEES_URL, settings);
            if(fetchResponse.status != 201){
                alert("el empleado no se ha podido crear,intentelo de nuevo.");
                setTimeout(window.location.reload(), 1000);
            }else{
                alert("el empleado ha sido creado")
                setTimeout(window.location.reload(), 1000);
            }
        }
        
}

// modal func
const modalOp = async (isEdit,id,name) => {
    let NameData = document.getElementById("employeeName")
    if (OpenModal != true) {
        modals.style.display = "none";
    }else{
        modals.style.display = "flex";
    }  

    if(isEdit == true){
        NameData.value = name;
        document.getElementById("buttonSubmit").textContent = "Editar"
        document.getElementById("buttonSubmit").dataset.edit = true
        document.getElementById("buttonSubmit").dataset.id = id
    }else{
        NameData.value = "";
        document.getElementById("buttonSubmit").textContent = "Agregar"
        document.getElementById("buttonSubmit").dataset.edit = false
        document.getElementById("buttonSubmit").dataset.id = null
    }
}
// eventos modal add
addEmployee.addEventListener("click",()=>{
    OpenModal = true
    modalOp(false)
})
// modal edit
document.getElementById("table").addEventListener("click",(e)=>{
    if(e.target.classList[0] == "son-edit"){
        OpenModal = true
        modalOp(true,e.target.dataset.id,e.target.dataset.name)
    }
})

// eventos modal close
closed.addEventListener("click",()=>{
    OpenModal = false
    modalOp()
});

//  submit event func
const SubmitApiEmployees = async (methods,datas,ids) =>{
    response = await ApiEmployees(methods,datas,ids)
};

// submit event
document.getElementById("buttonSubmit").addEventListener("click",(e)=>{
    let valueData = document.getElementById("employeeName");
    if(e.target.dataset.edit == "true"){
        SubmitApiEmployees("PUT",valueData.value,e.target.dataset.id)
    }else{
        SubmitApiEmployees("POST",valueData.value,null)
    }
});
