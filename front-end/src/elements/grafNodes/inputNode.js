import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode.js';


const handleStyle = { left: 10 };

function InputNode({data, isConnectable}) {
  return (
    <div className={`node input`}>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
      <BaseNode data={data}/>
    </div>
  );
} 
export default InputNode;
