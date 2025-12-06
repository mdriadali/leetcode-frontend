 import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosClient from '../utils/axiosClient'


export const registerUser=createAsyncThunk(
    'auth/register',
    async(userData, {rejectWithValue})=>{
        try {
            const response= await axiosClient.post('/user/register', userData)
            return response.data.user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const loginUser=createAsyncThunk(
    'auth/login',
    async(credentials, {rejectWithValue})=>{
        try {
            const response= await axiosClient.post('/user/login', credentials)
            return response.data.user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const checkUser=createAsyncThunk(
    'auth/check',
    async( _, {rejectWithValue})=>{
        try {
            const response= await axiosClient.get('/user/check')
            return response.data.user
        } catch (error) {
            return rejectWithValue(error)
        }
    } 
)
export const logoutUser=createAsyncThunk(
    'auth/logout',
    async( _, {rejectWithValue})=>{
        try {
            await axiosClient.post('/user/logout')
            return null
        } catch (error) {
            return rejectWithValue(error)
        }
    } 
)



const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        isAuthenticated:false,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
     builder

    //  Register User Case
     .addCase(registerUser.pending,(state)=>{
        state.loading=true,
        state.error=null
     })
     .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
     })
     .addCase(registerUser.rejected,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload?.message||'Somthing went wrong',
        state.user=null
     })

     // login user case 
     .addCase(loginUser.pending,(state)=>{
        state.loading=true,
        state.error=null
     })
     .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
     })
     .addCase(loginUser.rejected,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload?.message||'Somthing went wrong',
        state.user=null
     })

     // Check user case

     .addCase(checkUser.pending,(state)=>{
        state.loading=true,
        state.error=null
     })
     .addCase(checkUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=!!action.payload,
        state.user=action.payload
     })
     .addCase(checkUser.rejected,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload?.message||'Somthing went wrong',
        state.user=null
     })

     // logout user case 
     .addCase(logoutUser.pending,(state)=>{
        state.loading=true,
        state.error=null
     })
     .addCase(logoutUser.fulfilled,(state)=>{
        state.loading=false,
        state.isAuthenticated=false
        state.user=null
        state.error=null
     })
     .addCase(logoutUser.rejected,(state,action)=>{
        state.loading=false,
        state.isAuthenticated=false,
        state.error=action.payload?.message||'Somthing went wrong',
        state.user=null
     })

    }

})

export default authSlice.reducer;