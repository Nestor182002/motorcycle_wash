let Production=false
var URL_LOCAL_typeService=`http://localhost:8000`
var URL_PRODUCTION_typeService=`https://global.herokuapp.com`

if(Production == true){
    URL_LOCAL_typeService=URL_PRODUCTION_typeService
}

var typeService_URL=`${URL_LOCAL_typeService}/api/typeservice/`

// get services
async function typeServiceList(API_URL,searchs="",pagination=1) {
    let table=document.getElementById("table")
    let urls = API_URL
    if(searchs != ""){
        urls=`${API_URL}?page=${pagination}&search=${searchs}`
    }
    const response = await fetch(urls);
    const data= await response.json()

    table.innerHTML = "";
    data.results.forEach(element => {
        table.innerHTML +=`
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" style = "height: 40px;">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
        ${element.pk}
        </th>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            ${element.description}
        </th>
        <td class="px-6 py-4 ">
            ${element.price}
        </td>
        <td class="px-6 py-4">
            ${element.employee_earnings}
        </td>
        <td class="px-6 py-4">
        ${element.company_earnings}
        </td>
        <td class="px-6 py-4 text-right father-edit">
            <a href="#" data-id="${element.pk}" data-description="${element.description}" class="son-edit font-medium text-red-600 dark:text-blue-500 hover:underline">Eliminar</a>
        </td>
    </tr>
        
        `
    });

  }

// load pages
typeServiceList(typeService_URL);

// pagination
document.getElementById("backP").addEventListener("click",(e)=>{
    e.preventDefault()
    let value=document.getElementById("backP").href;
    typeServiceList(value);
});
document.getElementById("nextP").addEventListener("click",(e)=>{
    e.preventDefault()
    let value= document.getElementById("nextP").href.toString();
    typeServiceList(value);
});

// search
let searchInput=document.getElementById("simple-search")
searchInput.addEventListener("keyup",()=>{
    typeServiceList(typeService_URL,searchInput.value);
});

// add services with modal
var OpenModal = false
let csrfToken=document.getElementsByName("csrfmiddlewaretoken")[0].value

let addService = document.getElementById("addService");
let modals = document.getElementById("modals");
let closed = document.getElementById("close");
let buttonSubmit = document.getElementById("buttonSubmit");

// inputs
let description = document.getElementById("description")
let price = document.getElementById("price")
let employinput = document.getElementById("employinput")
let companyinput = document.getElementById("companyinput")

// modal func
const modalOp = async (isDelete,id) => {
    if (OpenModal != true) {
        modals.style.display = "none";
    }else{
        modals.style.display = "flex";
    }  

    if(isDelete == true){
        document.getElementById("buttonSubmit").textContent = "Eliminar"
        document.getElementById("buttonSubmit").dataset.delete = true
        document.getElementById("buttonSubmit").dataset.id = id
    }else{
        document.getElementById("buttonSubmit").textContent = "Agregar"
        document.getElementById("buttonSubmit").dataset.delete = false
        document.getElementById("buttonSubmit").dataset.id = null
    }
};

// eventos modal add
addService.addEventListener("click",()=>{
    description.value = "";
    price.value = "";
    employinput.value = "";
    companyinput.value = "";
    OpenModal = true;
    modalOp(false);
    document.getElementById("data_submit").style.display = "block";
    document.getElementById("isDelete").style.display = "None";
});
// modal delete
document.getElementById("table").addEventListener("click",(e)=>{
    if(e.target.classList[0] == "son-edit"){
        OpenModal = true;
        modalOp(true,e.target.dataset.id);
        document.getElementById("data_submit").style.display = "None";
        document.getElementById("isDelete").style.display = "block";
    }
});

// eventos modal close
closed.addEventListener("click",()=>{
    OpenModal = false;
    modalOp();
});

// funct api
const ApiTypeServices = async (methods,data,ids) =>{
    let datas = {
        "description":null,
        "price":null,
    }
    if(methods == "POST"){
        datas = {
            "description":data["description"],
            "price":data["price"],
            "employee_earnings":data["employinput"],
            "company_earnings":data["companyinput"],

        }
    }
        const settings = {
            method: methods,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(datas)
        };

        if(ids){
            const fetchResponse = await fetch(`${typeService_URL}${ids}`, settings);
            if(fetchResponse.status != 200){
                alert("el servicio no se ha podido eliminar,intentelo de nuevo.");
                setTimeout(window.location.reload(), 1000);
            }else{
                alert("el empleado ha sido eliminado.")
                setTimeout(window.location.reload(), 1000);
            }
        }else{
            const fetchResponse = await fetch(typeService_URL, settings);
            console.log(fetchResponse.status )
            if(fetchResponse.status != 200){
                alert("el empleado no se ha podido crear,intentelo de nuevo.");
                setTimeout(window.location.reload(), 1000);
            }else{
                alert("el empleado ha sido creado.")
                setTimeout(window.location.reload(), 1000);
            }
        }
        
}


buttonSubmit.addEventListener("click",(e)=>{

    if(e.target.dataset.delete == "true"){
        ApiTypeServices("DELETE",null,e.target.dataset.id)
    }
    else{
        const data = {
            "description": description.value,
            "price": parseInt(price.value),
            "employinput": parseInt(employinput.value),
            "companyinput": parseInt(companyinput.value),
        }
        let sumValidatePrice = (parseInt(employinput.value) + parseInt(companyinput.value) == parseInt(price.value)) ? true : false
        if(sumValidatePrice){
            ApiTypeServices("POST",data)
        }else{
            alert("Por favor verifique que la suma de las ganancias sea igual al precio.")
        }

    }

})