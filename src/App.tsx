import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import OverviewPage from "./pages/OverviewPage.tsx";

function ItemTwo() {
    return <div>Item Two</div>;
}
function ItemThree() {
    return <div>Item Three</div>;
}
function ItemFour() {
    return <div>Item Four</div>;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<OverviewPage />} />
                    <Route path="overview" element={<OverviewPage />} />
                    <Route path="two" element={<ItemTwo />} />
                    <Route path="three" element={<ItemThree />} />
                    <Route path="four" element={<ItemFour />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
