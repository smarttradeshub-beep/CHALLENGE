import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ChallengeDetailPage } from "./pages/ChallengeDetailPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { myChallenge } from "./data/challenge";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage challenges={myChallenge} />} />
        <Route path="/challenge/:id" element={<ChallengeDetailPage challenges={myChallenge} />} />
        <Route path="/analytics" element={<AnalyticsPage challenges={myChallenge} />} />
      </Routes>
    </Layout>
  );
}

export default App;
