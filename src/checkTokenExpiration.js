const checkTokenExpiration = () => {
  const expirationTime = localStorage.getItem("tokenExpiration");

  if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
    // If the current time is past the expiration time, remove the token
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    window.location.reload();
  }
};

export default checkTokenExpiration;
