export const showContactInfo = (ContactInfoList) => {
  return (dispatch) => {
    dispatch({
      type: "deposite",
      payload: ContactInfoList,
    });
  };
};
