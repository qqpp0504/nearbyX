import { useState } from "react";

import Map from "./components/Map.jsx";
import OpenScreen from "./components/OpenScreen.jsx";
import Search from "./components/Search.jsx";
import PlaceList from "./components/PlaceList.jsx";

function App() {
  const [visible, setVisible] = useState(true);

  function handleOpenMap() {
    setVisible(false);
  }

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleOpenMap} />}
      {!visible && (
        <>
          <Map />
          <Search />
          <PlaceList />
        </>
      )}
    </div>
  );
}

export default App;
