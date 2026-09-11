const navlinks=document.getElementById("nav-links");
const hamburger=document.getElementById("hamburger");
hamburger.addEventListener("click",()=>{
    navlinks.classList.toggle("show");
});
const loginItem=document.getElementById("loginbtn");
const userMenu=document.getElementById("userMenu");
const usrbtn=document.getElementById("usrbtn");
const dropdownMenu=document.getElementById("dropdownMenu");
const logoutbtn=document.getElementById("logoutbtn");
const userprofile=document.getElementById("user-profile");

  usrbtn.addEventListener("click",()=> {
    dropdownMenu.style.display= dropdownMenu.style.display==="block"?"none":"block"}); 
    document.addEventListener("click",(e)=>{
        if(!userMenu.contains(e.target)){
        dropdownMenu.style.display="none";
        }
    });
    function checkAuth(){
        const users =JSON.parse(localStorage.getItem("users"));
        if(users){
           loginItem.style.display="none";
           userMenu.style.display="inline-block";
         const letter=users.username?users.username.slice(0,1):"u";
          userprofile.textContent=letter;
        }
        else{
        loginItem.style.display="inline-block";
        userMenu.style.display="none";
        }
        logoutbtn.addEventListener("click",()=>{
            localStorage.removeItem("users");
            alert("logout succesfully");
            window.location.href="login.html";
                       checkAuth();
        }
        );
    }
    checkAuth();
// new code

    const collectionBtn = document.getElementById("collectionBtn");
    const collectionDropdown = document.getElementById("collectionDropdown");

    collectionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        collectionDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!collectionBtn.contains(e.target) && !collectionDropdown.contains(e.target)) {
            collectionDropdown.classList.remove("show");
        }
    });

    