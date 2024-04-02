import React from "react";
import { useMap } from "./map-context";

function MarkerButton({ pos }) {
  const { map } = useMap();
  function handleClick() {
    //console.log(flying);

    map.flyTo(pos);
  }

  return (
    // <div style={{ paddingTop: "8px" }}>
    <button onClick={() => handleClick()}>Link</button>
    // </div>
  );
}

export default MarkerButton;
