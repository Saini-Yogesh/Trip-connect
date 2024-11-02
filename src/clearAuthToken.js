const clearAuthToken = () => {
  // remove the token tokenExpiration
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiration");
};

export default clearAuthToken;
