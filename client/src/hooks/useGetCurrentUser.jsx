import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch=useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
              const result=await axios.get(`${serverUrl}/api/user/me`,{withCredentials:true})
              // Handle null user (not authenticated)
              if (result.data && result.data._id) {
                dispatch(setUserData(result.data))
              } else {
                dispatch(setUserData(null))
              }
            } catch (error) {
                // Clear user data on auth error (401, 400, etc.)
                if (error.response?.status === 401 || error.response?.status === 400) {
                    dispatch(setUserData(null))
                }
console.log("Auth check:", error.response?.status)
            }
        }
        getCurrentUser()
    }, [dispatch])
}

export default useGetCurrentUser
