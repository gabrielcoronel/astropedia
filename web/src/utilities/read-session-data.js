export default () => {
  const rawSessionData = localStorage.getItem("sessionData");
  const sessionData = JSON.parse(rawSessionData);

  return sessionData;
};
