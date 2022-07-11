let toggle = document.getElementById("toggle");
let sidebar = document.getElementById("sidebar");
let sidebarheight = document.getElementById("sidebar_height") 

let boolean = false;
toggle.addEventListener("click",()=>{

    if(screen.width <= 1023){

        if(boolean){
            sidebarheight.style.position = "relative"
            sidebar.style.top = "-400px";
            boolean = false;
        }
        else{
            sidebar.style.position = "relative";
            sidebar.style.top = "0px";
            // sidebarheight.style.height = "fixed"
            sidebarheight.style.position = "absolute"
            sidebarheight.style.zIndex = "10"
            sidebarheight.style.height = "auto"
            boolean = true;
        }

    }
    
})
window.addEventListener("load", (e)=> {

    if(screen.width <= 1023){
        sidebar.style.position = "relative";
        sidebar.style.top = "-1000px";
        sidebar.style.height = "200px";
    }
});
