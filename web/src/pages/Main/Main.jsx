import Auth from "../Auth/Auth";
import EventList from "../Events/EventList.jsx";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context.js";

// Componente principal de la aplicación
export default () => {
  // Se consume el estado global con la sesión actual
  const [sessionData, _] = useAtom(sessionDataAtom);

  return (
    <>
      {
        sessionData === null ?
        <Auth /> :
        <EventList />
      }
    </>
  );
};
