const clearAuthToken = () => {
  // remove the token tokenExpiration
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
  window.location.reload();
};

export default clearAuthToken;
