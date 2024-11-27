let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");
let submitBtn = document.getElementById("submitBtn");
let searchInput= document.getElementById("searchInput");
let tableSec= document.getElementById("tableSec");
let tableContent = document.getElementById("tableContent");
let siteContainer =[];

getLOcalStorage();
checkarr();

submitBtn.addEventListener('click', function(){


    if(validateForm(siteNameInput)&&validateForm(siteUrlInput)){
        let site = {
            name : siteNameInput.value ,
            url : siteUrlInput.value ,
        }
        siteContainer.push(site);
        storeLOcalStorage();
        checkarr();
        displayData(siteContainer);
        clearForm ()
        Swal.fire({
            title: "Great work!",
            text: "You've successfully added a bookmark.",
            icon: "success",
            timer: 1000,
          })

    } 
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Site Name or URL is not valid.",
            footer: `<p class="text-start fw-semibold">
       <i class="fa-regular fa-circle-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
       <i class="fa-regular fa-circle-right text-danger"></i> The Site URL must be valid.</p>`
          });
          
    }
})

function clearForm (){
    siteNameInput.value = null ;
    siteUrlInput.value = null ;
    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")
    
}

function storeLOcalStorage(){
    localStorage.setItem( "websites"  , JSON.stringify(siteContainer)   );
}
function getLOcalStorage(){
    if( localStorage.getItem( "websites")!=null){
        siteContainer=JSON.parse(localStorage.getItem("websites"))
        displayData(siteContainer);

    }
   
 }
   


function displayData(arr){
    let cartona = '';
    let regex = new RegExp (searchInput.value , 'gi');
    for(let i = 0  ; i < arr.length   ; i++  ){
        cartona+=`
        <tr>
                  <td scope="row" class="fw-semibold">${i+1}</td>
                  <td class="fw-semibold text-capitalize">${arr[i].name.replace(regex , (match)=>`<span class="my-color">${match}</span>`)}</td>              
                  <td><button class="btn btn-success  btn-sm" onclick="visitBookmark('${arr[i].url}')" ><i class="icon-eye1 pe-1 icon-btn"></i>Visit</button></td>
                  <td><button class="btn btn-danger  btn-sm" onclick="deleteWebsite(${i})" ><i class="icon-bin pe-1 icon-btn"></i>Delete</button></td>
                </tr>
        `

    }
    tableContent.innerHTML=cartona;
}

function deleteWebsite(index){

    Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this website. This action cannot be undone.!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            siteContainer.splice(index , 1);
             storeLOcalStorage();
             getLOcalStorage();
            checkarr();
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000,
          });
        }
      });

    
}

searchInput.addEventListener('input', function(){
    let word=searchInput.value;
    let searchContainer=[];
    for(let i = 0 ; i < siteContainer.length ; i++){
        if(siteContainer[i].name.toLowerCase().includes(word.toLowerCase())){
            searchContainer.push(siteContainer[i])
        }
    }
    displayData(searchContainer);
})
function visitBookmark(url) {
    window.open(url, '_blank');
}



let inp = document.querySelectorAll(".inp");

for( let i = 0 ; i< inp.length   ; i++   ){
  inp[i].addEventListener('input',function(e){
    
    validateForm(e);
  })
}


function validateForm(e){
    let regex ={
        siteName:/^([a-z]{3})[a-z]*$/i ,
        siteUrl :/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    }
   
    if(regex[e.target?.id ?e.target.id : e.id].test(e.target?.value ?e.target.value : e.value)){
          console.log('match');
        (e.target?.classList? e.target?.classList : e.classList ).remove("is-invalid") ;
        (e.target?.classList? e.target?.classList : e.classList ).add("is-valid") ;
        
        return true;
    }
    else{
          console.log('no match');
        (e.target?.classList? e.target?.classList : e.classList ).remove("is-valid") ;
        (e.target?.classList? e.target?.classList : e.classList ).add("is-invalid") ;
        
         return false;
    }
  }
  
  function checkarr() {
    if (siteContainer.length === 0) {
        tableSec.classList.add("d-none")
    } else {
        
        tableSec.classList.remove("d-none")
    }
  }
 