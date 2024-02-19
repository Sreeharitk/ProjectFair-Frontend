/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const addResponseContext = createContext();
export const updateResponseContext = createContext();
// eslint-disable-next-line react/prop-types
function ContextShare({ children }) {
  const [addResponse, setAddResponse] = useState("");
  const [updateResponse, setUpdateResponse] = useState("");
  return (
    <>
      <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
        <updateResponseContext.Provider
          value={{ updateResponse, setUpdateResponse }}
        >
          {children}
        </updateResponseContext.Provider>
      </addResponseContext.Provider>
    </>
  );
}

export default ContextShare;
