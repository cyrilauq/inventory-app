"use client";

import { useState } from "react";

const Dashboard = () => {
    const [inventoriesCount, setInventoriesCount] = useState(0);

    return(
        <>
            <h2>Dashboard</h2>
            <span>You have {inventoriesCount} intentory</span>
        </>
    );
};

export default Dashboard;