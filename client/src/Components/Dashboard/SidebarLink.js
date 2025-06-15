import React from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'

function SidebarLink({ link, iconName }) {

    const navigate = useNavigate();

    const location = useLocation();

    const Icon = Icons[iconName];

    function matchRoute(route) {
        return (matchPath({ path: route }, location.pathname))
    }

    return (
        <Link
            to={link.path}
            // onClick={() => dispatch(resetCourseState())}
            onClick={() => navigate(`${link.path}`)}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
                } transition-all duration-200`}
        >
            <div className="flex items-center gap-x-2">
                {/* Icon Goes Here */}
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </Link>
    )
}

export default SidebarLink