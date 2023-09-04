export function makeModules(functions) {
	const modulesArray = [];
	//setup modules
	for (let i = 0; i < functions.length; i++) {
		var newModule = {};
		newModule.name = functions[i].name;
		newModule.type = functions[i].type;
		newModule.description = functions[i].description;
		newModule.type_in = functions[i].type_in;
		newModule.type_out = functions[i].type_out;
		newModule.code = functions[i].code;
		modulesArray.push(newModule);
	}
	return {
		initialModules: modulesArray,
	};
}
