import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"

function useGetCurrentUser() {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/user/me`,
                    { withCredentials: true }
                )
                if (result.data && result.data._id) {
                    dispatch(setUserData(result.data))
                } else {
                    dispatch(setUserData(null))
                }
            } catch (error) {
                // 401 = no token or invalid — user is simply not logged in
                dispatch(setUserData(null))
            }
        }

        getCurrentUser()
    }, [dispatch])
}

export default useGetCurrentUser