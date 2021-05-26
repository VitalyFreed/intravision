import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    requests: [],
    guid: null,
    statuses: [],
    createModal: false,
    changeModal: null
};

export const getGuid = createAsyncThunk(
    'requestReducer/getGuid',
    async () => {
        const response = await fetch('http://intravision-task.test01.intravision.ru/api/Tenants');
        const data = await response.json();
        return data;
    }
);

export const getRequests = createAsyncThunk(
    'requestReducer/getRequests',
    async (guid) => {
        const response = await fetch(`http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=${guid}`);
        const data = await response.json();
        return data;
    }
);

export const getStatuses = createAsyncThunk(
    'requestReducer/getStatuses',
    async (guid) => {
        const response = await fetch(`http://intravision-task.test01.intravision.ru/api/${guid}/Statuses`);
        const data = await response.json();
        return data;
    }
);

export const getUsers = createAsyncThunk(
    'requestReducer/getUsers',
    async (guid) => {
        const response = await fetch(`http://intravision-task.test01.intravision.ru/api/${guid}/Users`);
        const data = await response.json();
        return data;
    }
);

export const createRequest = createAsyncThunk(
    'requestReducer/createRequest',
    async (data) => {
        const response = await fetch(`http://intravision-task.test01.intravision.ru/api/${data.guid}/Tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data.request)
        });
        const json = await response.json();
        data.request.id = json;
        return data.request;
    }
);

export const updateRequest = createAsyncThunk(
    'requestReducer/updateRequest',
    async (data) => {
        console.log(data)
        const response = await fetch(`http://intravision-task.test01.intravision.ru/api/${data.guid}/Tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data.request)
        });
        const json = await response.json();
        return json;
    }
);

const requestReducer = createSlice({
    name: 'requestReducer',
    initialState,
    reducers: {
        'loadRequests': (state, action) => {
            return state.requests;
        },
        'openCreateModal': (state, action) => {
            state.changeModal = null;
            state.createModal = true;
        },
        'closeCreateModal': (state, action) => {
            state.createModal = false;
        },
        'openChangeModal': (state, action) => {
            state.createModal = false;
            state.changeModal = action.payload;
        },
        'closeChangeModal': (state, action) => {
            state.changeModal = null;
        },
    },
    extraReducers: {
        [getGuid.fulfilled]: (state, action) => {
            state.guid = action.payload;
        },
        [getRequests.fulfilled]: (state, action) => {
            state.requests = action.payload.value;
        },
        [getStatuses.fulfilled]: (state, action) => {
            state.statuses = action.payload;
        },
        [createRequest.fulfilled]: (state, action) => {
            state.requests.unshift(action.payload);
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
        [updateRequest.fulfilled]: (state, action) => {
            console.log(action.payload);
        }
    },
});

export const {
    loadRequests,
    openCreateModal,
    closeCreateModal,
    openChangeModal,
    closeChangeModal
} = requestReducer.actions;

export default requestReducer.reducer;

export const getRequestsSelector = state => state.requestReducer.requests;

export const getGuidSelector = state => state.requestReducer.guid;

export const getRequestById = (state, id) => state.requestReducer.requests.find(req => req.id === id);

export const getStatusesSelector = state => state.requestReducer.statuses;

export const getUsersSelector = state => state.requestReducer.users;

export const getCreateModalsSelector = state => state.requestReducer.createModal;

export const getChangeModalsSelector = state => state.requestReducer.changeModal;