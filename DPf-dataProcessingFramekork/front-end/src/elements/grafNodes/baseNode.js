import { useCallback, useState, useStoreState} from 'react';
import { Handle, Position, useNodes, useNodeId } from 'reactflow';
import '../css/graf/nodes.sass'
const handleStyle = { left: 10 };

function BaseNode({ data, isConnectable}) {
  const [name, setName] = useState(data.name)
  const [scriptName,setScriptName]=useState(data.scriptName);
  const [type,setType]=useState(data.type);
  const [script,setScript]=useState(data.script);
  const [id,setId]=useState(data.id);
  
  /*,connections:  []*/
  /*const onChange = useCallback((evt) => {
    setDades(evt.target.value);
  }, []);*/

  return (
    <div>
      <label id="name" htmlFor="text">{name}</label>
    </div>
  );
}

export default BaseNode;
