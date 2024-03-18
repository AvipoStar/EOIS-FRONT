import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    id: null,
    name: null,
    surname: null,
    patronimyc: null,
    bornDate: null,
    gender: null,
    sessionCount: null,
    photoPath: null,
    roleId: null,
  },
  reducers: {
    setUserInfo: (_state, action) => {
      return action.payload;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    setProfiles: (_state, action) => {
      return action.payload;
    },
  },
})

const directionsSlice = createSlice({
  name: "direction",
  initialState: [],
  reducers: {
    setDirections: (_state, action) => {
      return action.payload;
    },
  },
})

const rolesSlice = createSlice({
  name: "role",
  initialState: [],
  reducers: {
    setRoles: (_state, action) => {
      return action.payload;
    },
  },
})

const eventTypesSlice = createSlice({
  name: "eventType",
  initialState: [],
  reducers: {
    setEventTypes: (_state, action) => {
      return action.payload;
    },
  },
})

const firmsOnCurrentSession = createSlice({
  name: "firmsOnCurrentSession",
  initialState: [],
  reducers: {
    setFirmsOnCurrentSession: (_state, action) => {
      return action.payload;
    },
  },
})

export const { setUserInfo } = userInfo.actions;
export const { setProfiles } = profileSlice.actions;
export const { setDirections } = directionsSlice.actions;
export const { setRoles } = rolesSlice.actions;
export const { setEventTypes } = eventTypesSlice.actions;
export const { setFirmsOnCurrentSession } = firmsOnCurrentSession.actions;


export default {
  userInfo: userInfo.reducer,
  profiles: profileSlice.reducer,
  directions: directionsSlice.reducer,
  roles: rolesSlice.reducer,
  eventTypes: eventTypesSlice.reducer,
  firmsOnCurrentSession: firmsOnCurrentSession.reducer,
};
