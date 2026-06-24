import api from "@/config/api.js";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchProject = createAsyncThunk(
    "projects/fetch",
    async ({category, tag}) => {
        try {
            const {data} = await api.get("api/projects", {params: {category, tag}});
            console.log("fetch project, ", data)
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

export const searchProjects = createAsyncThunk(
    "projects/search",
    async (keyword) => {
        try {
            //In my opinion I make this correctly cause method searchProjects has parameter keyword with Request Param
            // annotation. But he uses in this projects/search/?keyword=keyword, without the params
            //
            const {data} = await api.get("api/projects/search", {params: {keyword}}); //fixme
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

export const updateProject = createAsyncThunk(
    "projects/update",
    async ({projectId, project}) => {
        try {
            const {data} = await api.patch(`api/projects/${projectId}`, project);
            console.log("update project", data);
            return data
        } catch (error) {
            console.error(error)
        }
    }
)

export const createProject = createAsyncThunk(
    "projects/create",
    async (projectData) => {
        try {
            const {data} = await api.post("api/projects", projectData);
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

export const fetchProjectById = createAsyncThunk(
    "projects/fetchById",
    async (id) => {
        try {
            // const {data} = await api.get("api/projects" + id);  without /
            const {data} = await api.get("api/projects/" + id);
            console.log("project ", data)
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (id) => {
        try {
            await api.delete("api/projects/" + id);
            console.log("delete projects ", id)
            return id
        } catch (error) {
            console.log("error " + error);
        }
    }
)


export const inviteToProject = createAsyncThunk(
    "projects/inviteTo",
    async ({projectId, email}) => {
        try {
            const {data} = await api.post("api/projects/invite", {projectId, email});
            console.log("invite projects ", data)
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

export const acceptInvitation = createAsyncThunk(
    "projects/acceptInvitation",
    async ({token, navigate}) => {
        try {
            const {data} = await api.get("api/projects/accept_invitation", {params: {token}});

            navigate("/project/" + data.projectId)
            console.clear()
            console.log("accept projects ", data)
            return data
        } catch (error) {
            console.log("error " + error);
        }
    }
)

const initialState = {
    projects: [],
    status: "idle",
    error: null,
    projectDetails: [],
    searchProjects: []
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.projects = action.payload
                state.status = "succeeded"
            })

            .addCase(searchProjects.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.searchProjects = action.payload
            })

            .addCase(createProject.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.projects.push(action.payload)
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.projectDetails = action.payload
            })

            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.projects = state.projects.filter(project => project.id !== action.payload)
            })

            .addCase(acceptInvitation.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(inviteToProject.fulfilled, (state) => {
                state.status = "succeeded"
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.projects = state.projects.map(project =>
                    project.id === action.payload.id ? action.payload : project)
            })

            .addMatcher(action => action.type.endsWith("rejected"),
                (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message ?? "Unknown error"
                })

            .addMatcher(action => action.type.endsWith("pending"), state => {
                state.status = "pending"
                }
            )
            .addDefaultCase(state => state)
    }
})

export default projectSlice.reducer
export const selectProjects = state => state.project.projects
export const selectProjectDetails = state => state.project.projectDetails
