
// //we check if the save input is functioning properly when clicked
// let inputBtn = document.getElementById("input-btn")

// function saveLead(){
//     console.log("Button was clicked!")
// }

// inputBtn.addEventListener("click", function(){
//     console.log("Button was clicked from addEventListener")
// })
//2nd one is more cleaner and html doesn't have to worry about events at all


let myLead=[] 
const inputEl= document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn= document.getElementById("delete-btn")
const tabBtn= document.getElementById("tab-btn")
const ulEl= document.getElementById("ul-el")

let leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLead"))

//when we reload it, it will render by fetching data from local storage
if(leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}


inputBtn.addEventListener("click", function(){
    myLead.push(inputEl.value)
    inputEl.value=""

    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)
 
})

deleteBtn.addEventListener("dblclick", function(){
    myLead=[]
    localStorage.clear()
    render(myLead)
})

tabBtn.addEventListener("click", function(){
    //from chrome object, in it a tabs objects, in it a method called query exists and this method will be called
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLead.push(tabs[0].url);
        localStorage.setItem("myLead", JSON.stringify(myLead));
        render(myLead);

        })
})



function render(leads){
    let leadList=""
    for(let i=0; i<leads.length; i++){
        leadList += `<li>
                        <a href='${leads[i]}' target='_blank'> 
                            ${leads[i]} 
                        </a> 
                    </li>`
    }
    ulEl.innerHTML= leadList
    //using DOM methods is costly, better to use it once rather than using it for multiple times to push each lead
}





//Q How to add <li> element in <ul> element
// one way is to use inner HTML
// for(let i=0; i<myLead.length; i++){
//     ulEl.innerText+="<li>"+ myLead[i]+ "</li>"
// }   

//2nd way is to use create and append an element
// for(let i=0; i<myLead.length; i++){
//     //create an <li> element 
//     const li= document.createElement("li")
//     //add content to that element
//     li.textContent= myLead[i]
//     //append this new element to an existing valid element here <ul>
//     ulEl.append(li)
// }








