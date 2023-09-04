import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode.js';


const handleStyle = { left: 10 };

function TransformNode({ data, isConnectable }) {
  return (
    <div className={`node transform`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom}  isConnectable={isConnectable} />
      <BaseNode data={data}/>
    </div>
  );
}
export default TransformNode;
