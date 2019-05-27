import {
	SET_SELECTED_PROPOSAL,
	ALL_PROJECT_LOADED,
	PROJECT_DETAIL_LOADED,
	PROJECT_FILES_LOADED,
	TEMPLATES_LOADED,
	MESSAGE_LOADED,
	PROPOSALS_LOADED
} from "../constants/gen-action-types";
import Axios from "axios";

export function setSelectedProposal(id) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_SELECTED_PROPOSAL" });
		return Axios.get(process.env.PROJECT_API + "proposals/" + id)
			.then(response => dispatch({ type: SET_SELECTED_PROPOSAL, payload: response.data }))
			.catch(err => console.log(err.message))
	}
}

export function awardProject(id, cb) {
	return function (dispatch) {
		return Axios.put(process.env.PROJECT_API + "proposals/" + id, {
			"status": "AWARDED"
		})
			.then(response => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function deleteProposalFile(id, name, cb) {
	return function (dispatch) {
		return Axios.delete(process.env.PROJECT_API + "proposals/" + id + "/files/" + name)
			.then(response => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function deleteProject(id, cb) {
	return function (dispatch) {
		return Axios.delete(process.env.PROJECT_API + "projects/" + id)
			.then(response => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function deleteProposal(id, cb) {
	return function (dispatch) {
		return Axios.delete(process.env.PROJECT_API + "proposals/" + id)
			.then(response => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function getProjectsByGenId(id, page, rowSize) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_PROJECTS" });
		return Axios.get(process.env.PROJECT_API + "contractors/" + id + "/projects", {
			params: {
				"page": page,
				"size": rowSize
			}
		})
			.then(response => dispatch({ type: "PROJECT_LOADED", payload: response.data }))
			.catch(err => console.log(err.message))
	}
}

export function getAllProjects(page, size) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_ALL_PROJECTS" });
		return Axios.get(process.env.PROJECT_API + "projects", {
			params: {
				'page': page,
				'size': size
			}
		})
			.then(response => {
				dispatch({ type: ALL_PROJECT_LOADED, payload: response.data });
			})
			.catch(err => console.log(err))
	}
}

export function getProjectDetailById(id) {
	return function (dispatch) {
		return Axios.get(process.env.PROJECT_API + "projects/" + id)
			.then(response => {
				dispatch({ type: PROJECT_DETAIL_LOADED, payload: response.data })
			})
			.catch(err => console.log(err.message));
	}
}

export function getProposals(id, page, size) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_PROPOSALS" });
		return Axios.get(process.env.PROJECT_API + "projects/" + id + "/proposals", {
			params: {
				"page": page,
				"size": size
			}
		})
			.then((response) => {
				dispatch({ type: PROPOSALS_LOADED, payload: response.data });
			})
			.catch(err => console.log(err.message))
	}
}

export function getProjectMessage(id) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_MESSAGES" });
		return fetch("https://bcbemock.getsandbox.com/" + id + "/messages")
			.then(response => response.json())
			.then(json => {
				dispatch({ type: MESSAGE_LOADED, payload: json });
			})
	}
}

export function addProject(id, data, cb) {
	return function (dispatch) {
		return Axios.post(process.env.PROJECT_API + "contractors/" + id + "/projects", data)
			.then((response) => {
				cb(response.data.id);
			}).catch(err => {
				console.log(err.message);
				cb(false);
			});
	}
}

export function addFiles(id, files, cb) {
	return function (dispatch) {
		const formData = new FormData();
		files.forEach(async (file) => {
			await formData.append('file', file);
		});

		return Axios.post(process.env.PROJECT_API + "projects/" + id + "/files/upload/multiple",
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				cb(true);
				console.log(response);
			}).catch(err => {
				cb(false);
				console.log(err.message);
			});
	}
}

export function addFilesToProposal(id, files, cb) {
	return function (dispatch) {
		const formData = new FormData();
		files.forEach(async (file) => {
			await formData.append('file', file);
		});

		return Axios.post(process.env.PROJECT_API + "proposals/" + id + "/files/upload/multiple",
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((response) => {
				cb(true);
			}).catch(err => {
				cb(false);
				console.log(err.message);
			});
	}
}

export function deleteFile(id, name, cb) {
	return function (dispatch) {
		return Axios.delete(process.env.PROJECT_API + "projects/" + id + "/files/" + name)
			.then((response) => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function getTemplates(page, size) {
	return function (dispatch) {
		dispatch({ type: "CLEAR_TEMPLATES" });

		return Axios.get(process.env.PROJECT_API + "templates", {
			params: {
				"page": page,
				"size": size
			}
		})
			.then(response => {
				dispatch({ type: TEMPLATES_LOADED, payload: response.data })
			})
			.catch(err => console.log(err.message))
	}
}

export function addTemplate(projectId, templateId, cb) {
	return function (dispatch) {
		return Axios.post(process.env.PROJECT_API + "projects/" + projectId + "/templates/" + templateId)
			.then(response => {
				cb(true);
			}).catch(err => {
				cb(false);
				console.log(err.message);
			})
	}
}

export function deleteTemplate(projectId, templateId, cb) {
	return function (dispatch) {
		return Axios.delete(process.env.PROJECT_API + "projects/" + projectId + "/templates/" + templateId)
			.then(response => {
				cb(true);
			})
			.catch(err => {
				cb(false);
				console.log(err.message)
			})
	}
}

export function updateProject(id) {
	return function (dispatch) {

		return Axios.get(process.env.PROJECT_API + "projects/" + id)
			.then(response => {
				dispatch({
					type: PROJECT_DETAIL_LOADED,
					payload: response.data
				})
			})
			.catch(err => console.log(err.message))
	}
}

export function submitProposal(cont_id, pro_id, proposal, cb) {
	return function (dispatch) {
		return Axios.post(process.env.PROJECT_API + "contractors/" + cont_id + "/projects/" + pro_id + "/proposals", proposal)
			.then(async (response) => {
				cb(response.data.id);
			})
			.catch(err => {
				cb(false);
				console.log(err.message)
			});
	}
}