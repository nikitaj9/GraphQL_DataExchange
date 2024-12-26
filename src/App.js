import {React, useRef} from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComp from "./router/Routerr"


const App = () => {
  const ref = useRef();
  return (
    <>
    {/* <div ref={ref} /> */}
      <BrowserRouter>
        <RouterComp />
      </BrowserRouter>
    </>
  )
}

export default App;