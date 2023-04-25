// Lee los datos de la sesión actual del localStorage

export default () => {
  // Obtiene la cadena representando los datos
  const rawSessionData = localStorage.getItem("sessionData");

  // Parsea la cadena en un objeto
  const sessionData = JSON.parse(rawSessionData);

  return sessionData;
};
