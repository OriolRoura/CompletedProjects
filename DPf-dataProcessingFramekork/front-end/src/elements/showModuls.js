import "./css/showModuls.sass";
import React, { useEffect, useState } from "react";
import { conectionPath } from "../API/globals";
import ConfirmationCard from "./confirmatioCard";
import "./css/showNewNode.sass";
import {useDropzone} from 'react-dropzone';


function DropDownZone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'text/html': ['.py'],  
    },
    maxFiles:1,
    onDrop: files => props.setCode(files[0])
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        { //Check if message failed
        (acceptedFiles.length === 0)
          ? <p>Drag and drop the file here, or click here to select it</p>
          : <div> 
              <h4>File:</h4>
              <ul>{files}</ul> 
            </div> 
        }
      </div>
      <aside>
        
      </aside>
    </section>
  );
}


export function ShowModuls({
  modules,
  setModules,
  toggleModuls,
  nodes,
  setNodes,
}) {
  const [addModule, setAddModule] = useState(false);

  const [name, setName] = useState();
  const [type, setType] = useState("Input");
  const [description, setDescription] = useState();
  const [type_in, setType_in] = useState();
  const [type_out, setType_Out] = useState();
  const [code, setCode] = useState();

  const [confirmDel, setConfirmDel] = useState(false);
  const [delName, setDelName] = useState("");

  function toggleAddModule() {
    setAddModule(!addModule);
  }

  const deleteModuleComp = (modName) => {
    var del = confirmDel;
    for (let index = 0; index < nodes.length; index++) {
      if (nodes[index].data.scriptName === modName) {
        del = true;
        setConfirmDel(true);
        setDelName(modName);
        break;
      }
    }
    if (del === false) {
      deleteModule(modName, false);
    }
  };

  const deleteModule = (modName, IsNode) => {
    if (IsNode) {
      nodes.map((node) => {
        if (node.data.scriptName === modName) {
          const index = nodes.indexOf(node);
          let nodes_cp = nodes;
          nodes_cp.splice(index, 1);
          setNodes(nodes_cp);
        }
      });
    }
    fetch(conectionPath + "/module/" + modName, {
      method: "DELETE",
      mode: "cors",
    }).then((response) => {
      if (response.status === 200) {
        modules.map((module) => {
          if (module.name === modName) {
            const index = modules.indexOf(module);
            let modules_cp = modules;
            modules_cp.splice(index, 1);
            setModules(modules_cp);
            toggleModuls();
          }
        });
      }
    });
  };

  function handleSubmit(event) {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    const data = {
      name: name,
      type: type,
      description: description,
      type_in: type_in,
      type_out: type_out,
      code: code,
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("type_in", type_in);
    formData.append("type_out", type_out);
    formData.append("code", code);

    fetch(conectionPath + "/module", {
      // Enter your IP address here
      method: "POST",
      mode: "cors",
      body: formData, // body data type must match "Content-Type" header
    });

    const modulesArray = [];

    modules.map((module) => {
      modulesArray.push(module);
    });
    var newModule = {};
    newModule.name = data.name;
    newModule.type = data.type;
    newModule.description = data.description;
    newModule.type_in = data.type_in;
    newModule.type_out = data.type_out;
    newModule.code = data.code;
    modulesArray.push(newModule);
    setModules(modulesArray);
    console.log(modules);

    setName("");
    setType("");
    setDescription("");
    setType_in("");
    setType_Out("");
    setCode("");
  }

  function formatListWithCommas(list) {
    
    
    if (!Array.isArray(list)) {
      return list; // Return empty string if input is not an array
    }

    if (list.length === 0) {
      return ""; // Return empty string if the array is empty
    }

    const formattedList = list.map((item, index) => {
      if (index === list.length - 1) {
        return item; // No comma needed for the last item
      } else {
        return item + ", "; // Add comma for other items
      }
    });

    return formattedList.join(""); // Convert the array to a string
  }

  return (
    <div className="showModuls">
      <div className="showModuls-card">
        <div id="closeCrossModuls">
          <button
            type="button"
            class="btn-close btn-light m-3 position-relative top-0 start-0"
            aria-label="Close"
            onClick={toggleModuls}
          ></button>
        </div>
        <div className="showModuls-content">
          {!addModule && !confirmDel && (
            <div class="accordion title" id="accordionExample">
              <h2>Moduls</h2>
              {modules.map((module) => (
                <div key={module.name}>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id={"heading" + module.name}>
                      <button
                        class="accordion-button collapsed "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + module.name}
                        aria-expanded="false"
                        aria-controls={"collapse" + module.name}
                      >
                        {module.name}
                      </button>
                    </h2>

                    <div
                      id={"collapse" + module.name}
                      class="accordion-collapse collapse"
                      aria-labelledby={"heading" + module.name}
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Type: </strong>
                          <span
                            className={`badge ${
                              module !== null ? module.type : null
                            }`}
                          >
                            {module !== null ? module.type : null}
                          </span>
                        </p>
                        <p>
                          <strong>Description: </strong>
                          {module.description}
                        </p>
                        {module.type != "Input" && (
                          <p>
                            <strong>Input data type: </strong>
                            {formatListWithCommas(module.type_in)}
                          </p>
                        )}
                        {module.type != "Output" && (
                          <p>
                            <strong>Output data type: </strong>
                            {formatListWithCommas(module.type_out)}
                          </p>
                        )}
                        <button
                          type="button"
                          class="m-3 position-relative"
                          className="deleteModul"
                          aria-label="Close"
                          onClick={() => deleteModuleComp(module.name)}
                        >
                          Delete module
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {confirmDel && !addModule && (
            <ConfirmationCard
              setConfirmDel={setConfirmDel}
              delName={delName}
              deleteModule={deleteModule}
            />
          )}
          {addModule && (
            <div className="showNewNode-card">
              <h2>New Modul</h2>
              <form
                id="newModule"
                name="newModule"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <p>
                  Name:
                  <input
                    name="name"
                    type="text"
                    id="moduleNameIn"
                    class="form--input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </p>
                <p>
                  Type:
                  <select
                    name="type"
                    id="moduleTypeIn"
                    class="form--dropdown"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Input">Input</option>
                    <option value="Output">Output</option>
                    <option value="Transform">Transform</option>
                  </select>
                </p>
                <p>
                  Description:
                  <input
                    name="description"
                    type="text"
                    id="moduleDescriptionIn"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </p>
                {type != "Input" && (
                  <p>
                    Input data:
                    <input
                      name="type_in"
                      type="text"
                      id="moduleInIn"
                      value={type_in}
                      onChange={(e) => setType_in(e.target.value)}
                    ></input>
                    Format: ["str","JSON"]
                  </p>
                )}
                {type != "Output" && (
                  <p>
                    Output data:
                    <input
                      name="type_out"
                      type="text"
                      id="moduleOutIn"
                      value={type_out}
                      onChange={(e) => setType_Out(e.target.value)}
                    ></input>
                      Format: ["str","JSON"]

                  </p>
                )}
                <p>
                  Code file:
                  <DropDownZone code={code} setCode={setCode}/>
                </p>
                <button
                  type="button"
                  class="m-3 position-relative top-0 end-100% form--close"
                  aria-label="Close"
                  onClick={toggleAddModule}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="moduleSubmit"
                  className="form--submit"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
        {!addModule && !confirmDel && (
          <button
            type="button"
            class="m-3 position-relative top-0 end-100%"
            className="CreateModul"
            aria-label="Close"
            onClick={toggleAddModule}
          >
            Add Module
          </button>
        )}
      </div>
    </div>
  );
}
