import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOn: false,
  clickedDayIndex: null,
  isAddSchedule: false,
  isShowSchedule: false,
  scheduleData: null,
  selectStudent: [],
  selectStudentsForProgram: [],
  isShowStudentList: false,
  isShowSort: false,
  isEditOn: false,
  isInvOn: false,
};

const slicer = createSlice({
  name: "timeTableHomeworkSlice",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOn = true;
    },
    closeModal: (state) => {
      state.isModalOn = false;
      state.isAddSchedule = false;
      state.isShowSchedule = false;
      state.isShowStudentList = false;
      state.isShowSort = false;
      state.isEditOn = false;
      state.isInvOn = false;
    },
    setClickedDayIndex: (state, action) => {
      state.clickedDayIndex = action.payload;
    },

    openAddSchedule: (state) => {
      state.isShowStudentList = false;
      state.isAddSchedule = true;
      state.isShowSchedule = false;
      state.isInvOn = false;
    },
    openShowSchedule: (state) => {
      state.isShowSchedule = true;
      state.isAddSchedule = false;
      state.isShowStudentList = false;
      state.isInvOn = false;
    },

    setScheduleData: (state, action) => {
      state.scheduleData = action.payload;
    },
    setSelectStudent: (state, action) => {
      state.selectStudent = action.payload;
    },
    openStudentList: (state) => {
      state.isShowStudentList = true;
      state.isShowSort = false;
      state.isEditOn = false;
      state.isAddSchedule = false;
      state.isShowSchedule = false;
      state.isInvOn = false;
    },
    openSort: (state) => {
      state.isShowSort = true;
      state.isShowStudentList = false;
      state.isEditOn = false;
      state.isInvOn = false;
    },
    openEdit: (state) => {
      state.isEditOn = true;
      state.isShowSort = false;
      state.isShowStudentList = false;
      state.isInvOn = false;
    },
    setSelectStudentsForProgram: (state, action) => {
      state.selectStudentsForProgram = action.payload;
    },
    openInv: (state, action) => {
      state.isModalOn = true;
      state.isInvOn = true;
      state.isAddSchedule = false;
      state.isShowSchedule = false;
      state.isShowStudentList = false;
      state.isShowSort = false;
      state.isEditOn = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  setClickedDayIndex,
  openAddSchedule,
  openShowSchedule,
  setScheduleData,
  setSelectStudent,
  openStudentList,
  openSort,
  openEdit,
  setSelectStudentsForProgram,
  openInv,
} = slicer.actions;

export default slicer.reducer;
