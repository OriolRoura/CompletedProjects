import "./App.sass";
import "./elements/css/colorPalette.sass";
import { NavBar } from "./elements/navBar";
import { Graph } from "./elements/graph";
import { ShowModuls } from "./elements/showModuls";
import { ShowNewNode } from "./elements/showNewNode";
import { Info } from "./elements/info";
import React, { useState, useEffect, useRef } from "react";
import Alert from "./elements/alerts";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { joinGraph } from "./functionalities/joinGraph";
const flowKey = "DPF-Graph";

import { conectionPath } from "./API/globals";
import { makeModules } from "./functionalities/makeModules";
import Toast from "react-bootstrap/Toast";
import { Badge, ToastContainer } from "react-bootstrap";

function App() {
	//---------------------------Visibiility Handlers-----------------------------------------
	//Handles if info section is visible or not

	const [infoNode, setInfoNode] = useState(null);
	const [infoOpen, setInfoOpen] = useState(false);
	const [isStarted, setIsStarted] = useState(true);
	const [errors, setErrors] = useState([]);
	const closeInfo = () => {
		setInfoOpen(false);
		setInfoNode(null);
	};
	const openInfo = () => {
		setInfoOpen(true);
	};
	const setInfo = (node) => {
		if (infoNode != null) {
			setInfoNode(null);
		}
		setInfoNode(node);
	};

	//Handles if moduls section is visible or not
	const [modulsIsOpen, setModulsIsOpen] = useState(false);
	const handleToggleModuls = () => {
		setModulsIsOpen(!modulsIsOpen);
	};

	const [NewNode, setNewNode] = useState(false);
	const handleToggleNewNode = () => {
		setNewNode(!NewNode);
		console.log(NewNode);
	};

	//---------------------------MODES-----------------------------------------
	//Handles if app is in edit mode or not
	//TODO Change graph settings when in edit mode or not
	const [editMode, setEditMode] = useState(true);
	const sysStop = () => {
		setEditMode(true);
		//fetch /system/stop
		fetch(conectionPath + "/system/stop");
	};

	// Reference to child component
	const graphRef = useRef(null);

	const sysStart = () => {
		setEditMode(false);
		graphRef.current.restoreFlow()
		//set alerrt that it restored
		fetch(conectionPath + "/system/start");
	};

	const sysRestart = () => {
		//fetch /system/restart
		fetch(conectionPath + "/system/restart");
	};
	//--------------------------------NODES-----------------------------------
	const [nodes, setNodes] = useState([]);

	//-------------------------------MODULES----------------------------------
	const [modules, setModules] = useState([]);

	useEffect(() => {
		fetch(conectionPath + "/module")
			//.then(response=> console.log(response))
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((json) => {
				console.log(json);
				const { initialModules } = makeModules(json);
				console.log(initialModules);
				setModules(initialModules);
			});
		// empty dependency array means this effect will only run once (like componentDidMount in classes)
	}, []);

	useEffect(() => {
		const status = () => {
			let editModeTemp = true;
			let errorsTemp = [];
			fetch(conectionPath + "/system/status").then((response) => {
				response.json().then((json) => {
					Object.keys(json.response).forEach((key) => {
						if (json.response[key].status !== "RUNNING") {
							editModeTemp = false;
						}
						if (json.response[key].status === "ERROR") {
							errorsTemp.push(json.response[key].errors);
						}
					});
					setIsStarted(editModeTemp);
					if (errorsTemp !== errors) {
						setErrors(errorsTemp);
					}
				});
			});
		};
		status();
		setInterval(status, 5000);
	}, []);

	//---------------------------------APP-----------------------------------
	return (
		<div className="App">
			<NavBar
				sysStart={sysStart}
				sysStop={sysStop}
				sysRestart={sysRestart}
				editMode={!isStarted}
				toggleModuls={handleToggleModuls}
				toggleNewNode={handleToggleNewNode}
			/>

			<Info
				open={infoOpen}
				node={infoNode}
				closeInfo={closeInfo}
				editMode={true}
			/>
			{modulsIsOpen && (
				<ShowModuls
					toggleModuls={handleToggleModuls}
					modules={modules}
					setModules={setModules}
					nodes={nodes}
					setNodes={setNodes}
				/>
			)}
			{NewNode && (
				<ShowNewNode
					togglenewnode={handleToggleNewNode}
					nodes={nodes}
					setNodes={setNodes}
				/>
			)}
			<ReactFlowProvider>
				<Graph
					togglenewnode={handleToggleNewNode}
					setSelectedNode={setInfo}
					selectedNode={infoNode}
					closeInfo={closeInfo}
					openInfo={openInfo}
					isOpen={infoOpen}
					mode={!isStarted}
					nodes={nodes}
					setNodes={setNodes}
					modules={modules}
					ref={graphRef}
				/>
			</ReactFlowProvider>
			<ToastContainer className="position-absolute start-50 translate-middle-x">
				<br />
				<br />
				<br />
				{errors.map((err) => {
					return (
						<Toast
							onClose={() => {
								setErrors(errors.filter((e) => e !== err));
							}}
							show={true}
							delay={10000}
							autohide
							bg="warning"
							class="opacity-50"
						>
							<Toast.Header>
								<Badge bg="danger">!</Badge>
								&nbsp; &nbsp;
								<strong className="mr-auto">{err.error}</strong>
							</Toast.Header>
							<Toast.Body>
								Error message: {err.message} <br />{" "}
								<small>Remediation: {err.detail}</small>
							</Toast.Body>
						</Toast>
					);
				})}
			</ToastContainer>
		</div>
	);
}
export default App;
