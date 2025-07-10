import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }
  return <h1>Sala</h1>;
}
