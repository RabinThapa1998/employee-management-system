import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IEmployeeData } from '~/types';
import { RootState } from '../store';
const initialState: IEmployeeData[] = [] as IEmployeeData[];

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IEmployeeData>) => {
      const isItemExist = state.find((item) => item.email === action.payload.email);
      if (!isItemExist) {
        return [...state, action.payload];
      }
      const filteredState = state.filter((item) => item.email !== action.payload.email);
      return [...filteredState, action.payload];
    },
  },
});

export const { add } = employeeSlice.actions;
export const employeeSelector = (state: RootState): IEmployeeData[] => state.employee;

export default employeeSlice.reducer;
