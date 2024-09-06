import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

import { AuthProvider } from "./contexts/authentication";
function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={routes} />
            </AuthProvider>
        </>
    );
}

export default App;
