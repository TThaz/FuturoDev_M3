import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

import { CycleProvider } from "./contexts/cycle";
import { AuthProvider } from "./contexts/authentication";
function App() {
    return (
        <>
            <AuthProvider>
                <CycleProvider>
                    <RouterProvider router={routes} />
                </CycleProvider>
            </AuthProvider>
        </>
    );
}

export default App;
