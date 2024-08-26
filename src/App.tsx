// src/App.tsx

import React, { useState } from "react";
import { parseDocument } from "htmlparser2";
import { TreeNode, Node } from "./components/Tree";

function App() {
  const [domStructure, setDomStructure] = useState<Node | null>(null);
  const [url, setUrl] = useState<string>("");

  const fetchHtml = async () => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();
      const parsedDocument = parseDocument(data.contents) as unknown as Node;
      setDomStructure(parsedDocument);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchHtml}>Fetch HTML</button>
      <div>
        <h3>HTML Structure</h3>
        {domStructure && <TreeNode node={domStructure} />}
      </div>
    </div>
  );
}

export default App;
