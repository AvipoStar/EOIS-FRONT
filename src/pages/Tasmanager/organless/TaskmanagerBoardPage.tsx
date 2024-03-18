import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const TaskmanagerBoardPage = () => {
  const location = useLocation();

  const [boardId, setboardId] = useState<number>(-1);

  useEffect(() => {
    setboardId(
      Number(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      )
    );
  }, [location]);

  useEffect(() => {
    console.log("boardId", boardId);
  }, [boardId]);

  return <div>
    
  </div>;
};
