import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './baseNode.js';


const handleStyle = { left: 10 };

function OutputNode({data, isConnectable}) {
  return (
    <div className={`node output`}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <BaseNode data={data}/>
    </div>
  );
}
export default OutputNode;
