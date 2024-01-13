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
            <div className="min-w-[600px] text-left">
                <h2 className="underline underline-offset-4 my-2">Inventory name: {data?.name}</h2>
                <p className="mb-2">Item count: {data?.items?.length}</p>
                <InventoryItem />
                {data?.items?.map(i => <InventoryItem key={i.id} barcode={i.barcode} id={i.id} description={"coucou"} name={i.name} price={0} qty={i.qty} />)}
            </div>
        </PrivateRoute>
    );
};

export default Inventory;