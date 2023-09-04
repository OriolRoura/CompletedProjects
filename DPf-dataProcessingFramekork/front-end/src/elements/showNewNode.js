import "./css/showNewNode.sass";

import React, { useEffect, useState } from "react";
import { makeModules } from "../functionalities/makeModules";
import { conectionPath } from "../API/globals";

export function ShowNewNode({ togglenewnode, nodes, setNodes }) {
	const [modules, setModules] = useState([{ id: 123 }, { id: 321 }]);

	const [name, setName] = useState();
	const [module, setModule] = useState();
	const [position, setPosition] = useState([100, 100]);
	const [type, setType] = useState();
	const [repe, setRepe] = useState(false);
	function toggleAddNode() {
		console.log("HOOOOO");
	}

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

	const handleSubmit = (event) => {
		// prevents the submit button from refreshing the page
		var repetit = false;
		event.preventDefault();
		nodes.map((nod) => {
			if (nod.data.name === name) {
				repetit = true;
			}
		});
		setRepe(repetit);
		if (repetit) {
		} else {
			const id = nodes.length;
			var newNode = {};
			newNode.id = `${id}`;
			newNode.type = type;
			newNode.position = { x: -100, y: 100 };
			newNode.data = {};
			newNode.data.type = type;
			newNode.data.scriptName = module;
			newNode.data.script = module;
			newNode.data.id = id;
			newNode.data.name = name;

			console.log(newNode);
			console.log(nodes);

			const newNod = [];
			nodes.forEach((nod) => {
				newNod.push(nod);
			});
			newNod.push(newNode);
			console.log(newNod);

			setNodes(newNod);

			setName("");
			setType("");
			setPosition("");
			setModule("");
		}
	};

	return (
		<div className="showModuls">
			<div className="showNewNode-card">
				<h2 className="Heading">New node</h2>
				<div id="newNode">
					<div>
						<form
							id="newModule"
							name="newModule"
							onSubmit={(e) => {
								handleSubmit(e);
							}}
						>
							<div>
								<input
									name="name"
									type="text"
									class="form--input"
									placeholder="Type node name here..."
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								></input>
							</div>
							<div>
								Type:
								<select
									class="form--dropdown"
									name="type"
									value={type}
									onChange={(e) => {
										setType(e.target.value);
										console.log(e.target.value);
										modules.map((module) => {
											if (
												module.type === e.target.value
											) {
												console.log(module.name);
												setModule(module.name);
											}
										});
									}}
									required
								>
									<option value="null"> </option>
									<option value="Input"> Input </option>
									<option value="Transform">
										{" "}
										Transform{" "}
									</option>
									<option value="Output"> Output </option>
								</select>
							</div>
							<div>
								Module:
								<select
									class="form--dropdown"
									id="Modols"
									value={module}
									onChange={(e) => {
										console.log(e.target.value);
										setModule(e.target.value);
									}}
									required
								>
									{modules.map((module) => {
										if (module.type === type) {
											return (
												<option value={module.name}>
													{" "}
													{module.name}{" "}
												</option>
											);
										}
									})}
								</select>
							</div>
							<div className="form--buttons">
								<button
									type="button"
									class="form--close"
									aria-label="Close"
									onClick={togglenewnode}
								>
									Close
								</button>
								<button
									type="submit"
									id="moduleSubmit"
									class="form--submit"
									aria-label="submit"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
					<div>
						<p></p>
					</div>
				</div>
				{repe && (
					<>
						<div class="z-3 p-2 position-absolute">
							<div
								class="toast fade show"
								role="alert"
								aria-live="assertive"
								aria-atomic="true"
								data-bs-delay="10"
							>
								<div class="toast-header">
									<svg
										class="bd-placeholder-img rounded me-2"
										width="20"
										height="20"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
										preserveAspectRatio="xMidYMid slice"
										focusable="false"
									>
										<rect
											width="100%"
											height="100%"
											fill="#ff0f0f"
										></rect>
									</svg>
									<strong class="me-auto">
										A node with the same name alredy exist.
									</strong>
									<button
										type="button"
										class="btn-close"
										data-bs-dismiss="toast"
										aria-label="Close"
									></button>
								</div>
								<div class="toast-body">
									Please chose another.
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
