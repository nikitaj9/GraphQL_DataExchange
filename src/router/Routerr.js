import { Route, Routes } from "react-router-dom";
import ApsLogin from "../components/ApsLogin";
import ApsCallback from "../components/ApsCallback";


const RouterComp = () => {
    return (
        <Routes>
            <Route path="/" element={<ApsLogin />}></Route>
            <Route path="/oauth/callback/" element={<ApsCallback />}></Route>
        </Routes>
    )
}

export default RouterComp;