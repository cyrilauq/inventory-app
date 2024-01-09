"use client";

import { getInventories } from "@/services/inventory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [inventoriesCount, setInventoriesCount] = useState(0);
    const [inventories, setInventories] = useState(new Array<IInventory>());
    const router = useRouter();

    useEffect(() => {
        getInventories().then(result => {
            if(result.code === 401) {
                router.push("/");
            } else {
                if(result !== undefined) {
                    setInventories(result.data as IInventory[])
                }
            }
        });
    }, []);

    return(
        <>
            <h2>Dashboard</h2>
            <span>You have {inventories && inventories.length} intentory</span>
            {inventories && inventories.map(item => <p key={item.id}>{item.name}</p>)}
        </>
    );
};

export default Dashboard;