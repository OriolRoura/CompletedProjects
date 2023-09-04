import "./css/info.sass";
import React, { useState, useEffect } from "react";
import { LogCard } from "./logs.js";

export function Info(props) {
	const [node, setNode] = useState(props.node);
	useEffect(() => {
		setNode(props.node);
	}, [props.node]);

	return (
		<>
			<section
				className={` info-section offcanvas offcanvas-end ${
					props.open ? "show" : ""
				}`}
				id="offcanvasInfo"
			>
				{props.open && (
					<InfoCards
						closeInfo={props.closeInfo}
						node={props.node}
						open={props.open}
						editMode={props.editMode}
					/>
				)}
			</section>
		</>
	);
}

export function InfoCards({ closeInfo, node, open, editMode }) {
	return (
		<div className="info-start" id="infoNode">
			<button
				type="button"
				class="btn-close m-2"
				aria-label="Close"
				onClick={closeInfo}
			></button>
			<div className="info-card">
				<div
					className={`colorBackground ${
						node !== null ? node.type : null
					}BG`}
				></div>
				<div className="text">
					<div className="Header">
						<h1>{node !== null ? node.data.name : null}</h1>
						<span
							className={`badge ${
								node !== null ? node.type : null
							}`}
						>
							{node !== null ? node.type : null}
						</span>
					</div>
					<div className="infoBody">
						<h5>Information</h5>
						<p>
							Position: {node !== null ? node.position.x : null},{" "}
							{node !== null ? node.position.y : null}
						</p>
						<p>
							Modul: {node !== null ? node.data.scriptName : null}
						</p>
					</div>
				</div>
			</div>

			<div className="logs-card">
				{console.log(editMode)}
				<LogCard closeInfo={closeInfo} node={node} open={open} />
			</div>
		</div>
	);
}
