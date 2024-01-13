"use client";

import PrivateRoute from '@/components/global/privateRoute';
import { IInventory } from '../../../../module/inventory';
import fetch from '@/services/api';
import { useStoreAuth } from '@/store/authStore';
import { useEffect, useState } from 'react';
import InventoryItem from './inventoryItem';

interface IParams {
    inventory: string
}

const Inventory = ( { params }: {params: IParams} ) => {
    const [data, setData] = useState<IInventory | null>(null);
    const { isAuth } = useStoreAuth();

    useEffect(() => {
        async function fetchData() {
            const { data: result, isSuccess } = await fetch<IInventory>({ endPoint: `user/inventory/${params.inventory}` })
            if(isSuccess) {
                setData(result);
            }
        }
        if(!data) {
            fetchData();
        }
    }, [data, params.inventory]);

    return(
        <PrivateRoute isAuth={isAuth}>
            <div className="min-w-[600px]">
                <h2>Inventory</h2>
                <p>{data?.name}</p>
                <p>Item count: {data?.items?.length}</p>
                <InventoryItem />
                {data?.items?.map(i => <InventoryItem key={i.id} barcode={i.barcode} id={i.id} description={"coucou"} name={i.name} price={0} qty={i.qty} />)}
            </div>
        </PrivateRoute>
    );
};

export default Inventory;