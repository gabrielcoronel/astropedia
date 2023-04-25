import Auth from "../Auth/Auth";
import EventList from "../Events/EventList.jsx";
import { useAtom } from "jotai";
import { sessionDataAtom } from "../../context.js";

export default () => {
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
