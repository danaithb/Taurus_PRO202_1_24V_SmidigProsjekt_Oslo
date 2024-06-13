import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { StartGamePage } from "./pages/startGamePage";
import EnterUsernamePage from "./pages/enterUsernamePage";
import { LookAtStagePage } from "./pages/lookAtStagePage";
import { PollPage } from "./pages/pollPage";
import { EndPage } from "./pages/endPage";
import { BuyWithPointsPage } from "./pages/buyWithPointsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/enter-username-page" element={<EnterUsernamePage />} />
        <Route path="/start-game" element={<StartGamePage />}></Route>
        <Route path="/look-at-stage" element={<LookAtStagePage />}></Route>
        <Route path="/poll" element={<PollPage />}></Route>
        <Route path="/end-page" element={<EndPage />} />
        <Route
          path="/buy-with-points-Page"
          element={<BuyWithPointsPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
