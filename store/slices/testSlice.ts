import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type testState = {
    counter: number
    loading: boolean
}

const initialValues: testState = {
    counter: 0,
    loading: false,
}

export const setValueAsync = createAsyncThunk(
    "test/setValueAsync",
    async (value: number) => {
        const job = new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                if (value >= 0) {
                    resolve(value)
                } else {
                    reject(Error(""))
                }
            }, 1000)
        })

        return await job
    }
)

const testSlice = createSlice({
    name: "test",
    initialState: initialValues,
    reducers: {
        increase: (state: testState, action: PayloadAction<void>) => {
            state.counter = state.counter + 1
        },
        clear: (state: testState, action: PayloadAction<void>) => {
            return initialValues
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setValueAsync.fulfilled, (state, action) => {
            state.counter = action.payload
            state.loading = false
        })

        builder.addCase(setValueAsync.rejected, (state, action) => {
            state.counter = 0;
            state.loading = false
        })

        builder.addCase(setValueAsync.pending, (state, action) => {
            state.loading = true
        })
    },
})

export const { increase, clear } = testSlice.actions
export const testSelector = (store: RootState) => store.testReducer
export default testSlice.reducer