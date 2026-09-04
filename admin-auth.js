(async()=>{try{const user=await C3_REQUIRE_ADMIN();if(user)document.body.classList.remove('auth-pending')}catch{location.replace('login.html')}})();
