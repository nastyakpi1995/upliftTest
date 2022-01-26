import React, {useEffect, useState} from 'react';

import styles from './RopstenNetwork.module.css';
import CardIndeces from "../CardIndeces/CardIndeces";
import Header from "../Header/Header";
import { getIntens } from '../../servises/contract/smartTokenContract';
import { IRopstenNetDataItem } from '../../types/interfeces';


const RopstenNetwork = () => {
    const [ropstenNetData, setRopstenNetData] = useState<IRopstenNetDataItem[]>([])

    useEffect(() => {
        const getRopstenNetData = async () => {
            const ropstenNetData: IRopstenNetDataItem[] = await getIntens()

            setRopstenNetData(ropstenNetData)
        }
        getRopstenNetData()
    }, [])


    if (ropstenNetData.length < 1) return <div>spiner</div>;

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <Header />
                <div className={styles.title}>All Indeces</div>
                {ropstenNetData.map((ropstenNetDataItem: IRopstenNetDataItem, index: number) => (
                    <CardIndeces index={index} ropstenNetDataItem={ropstenNetDataItem} ropstenNetData={ropstenNetData} key={index} />
                ))}
            </div>
        </div>
    );
}

export default RopstenNetwork;
