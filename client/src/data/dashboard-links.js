const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
}

export function getSidebarLinks(userId) {
  const sidebarLinks = [
    {
      id: 1,
      name: "My Profile",
      path: `/dashboard/my-profile/${userId}`,
      icon: "VscAccount",
    },
    {
      id: 2,
      name: "Dashboard",
      path: "/dashboard/instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscDashboard",
    },
    {
      id: 3,
      name: "My Courses",
      path: "/dashboard/my-courses",
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscVm",
    },
    {
      id: 4,
      name: "Add Course",
      path: "/dashboard/add-course",
      type: ACCOUNT_TYPE.INSTRUCTOR,
      icon: "VscAdd",
    },
    {
      id: 5,
      name: "Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      type: ACCOUNT_TYPE.STUDENT,
      icon: "VscMortarBoard",
    },
    {
      id: 6,
      name: "Your Cart",
      path: "/dashboard/cart",
      type: ACCOUNT_TYPE.STUDENT,
      icon: "VscHistory",
    },
    {
      id: 7,
      name: "Dashboard",
      path: "/dashboard",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscCompass",
    },
    {
      id: 8,
      name: "Users",
      path: "/dashboard/users",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscDatabase",
    },
    {
      id: 9,
      name: "Analytics",
      path: "/dashboard/analytics",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscGraphScatter",
    },
    {
      id: 10,
      name: "Announcements",
      path: "/dashboard/announcements",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscBell",
    },
    {
      id: 11,
      name: "Draft",
      path: "/dashboard/draft-course",
      type: ACCOUNT_TYPE.ADMIN,
      icon: "VscIssueDraft",
    },
  ];

  return sidebarLinks;
}