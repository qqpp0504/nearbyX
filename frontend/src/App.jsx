import { useState } from "react";

import Map from "./components/Map.jsx";
import OpenScreen from "./components/OpenScreen.jsx";

function App() {
  const [visible, setVisible] = useState(true);

  function handleOpenMap() {
    setVisible(false);
  }

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleOpenMap} />}
      {!visible && <Map />}
    </div>
  );
}

export default App;
