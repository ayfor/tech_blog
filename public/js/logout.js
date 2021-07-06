const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      console.log("THE LOGOUT RESPONSE IS OKAY")
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#logout').addEventListener('click', logout);

console.log("Logout script has loaded.")