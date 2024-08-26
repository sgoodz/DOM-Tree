// src/components/Tree.tsx

import React from "react";

// Define the Node interface
export interface Node {
  type: string;
  name?: string;
  attribs?: Record<string, string>;
  children?: Node[];
}

// Define the props for TreeNode component
interface TreeNodeProps {
  node: Node;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  if (!node || node.type !== "tag") return null; // Ensure only element nodes are rendered

  return (
    <ul>
      <li>
        <strong>{node.name}</strong>
        {node.attribs && (
          <ul>
            {Object.entries(node.attribs).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        )}
        {node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};
