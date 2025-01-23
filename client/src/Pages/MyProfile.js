import React from 'react'
import { useSelector } from 'react-redux'

function MyProfile() {
    const { user, loading } = useSelector((state) => state.profile)
    return (
        <div>

        </div>
    )
}

export default MyProfile