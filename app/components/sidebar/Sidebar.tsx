import React from "react";

function Sidebar() {
  return (
    <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
    >
    <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
        <span className="text-2xl"><i className="bx bx-home"></i></span>
        <span>Dashboard</span>
    </a>

    <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
        <span className="text-2xl"><i className="bx bx-cart"></i></span>
        <span>Cart</span>
    </a>

    <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
        <span className="text-2xl"><i className="bx bx-shopping-bag"></i></span>
        <span>Shopping</span>
    </a>

    <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
        <span className="text-2xl"><i className="bx bx-heart"></i></span>
        <span>My Favourite</span>
    </a>

    <a href="#" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
        <span className="text-2xl"><i className="bx bx-user"></i></span>
        <span>Profile</span>
    </a>
</aside>
);
}

export default Sidebar;