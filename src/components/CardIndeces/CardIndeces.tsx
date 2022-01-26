import React, {useMemo, FunctionComponent} from 'react';
import {centsToUsd, changeWeiToEth, getFormatPercentageChange, getTitle, parseValue} from '../../utils/hepers';
import styles from './CardIndeces.module.css';
import {IRopstenNetDataItem} from "../../types/interfeces";

interface ICardIndexes {
    index: number,
    ropstenNetDataItem: IRopstenNetDataItem,
    ropstenNetData: IRopstenNetDataItem[]
}
const CardIndexesInner: FunctionComponent<ICardIndexes>  = ({index, ropstenNetDataItem, ropstenNetData}) => {
    const {usdPriceInCents, name, usdCapitalization, ethPriceInWei, percentageChange} = ropstenNetDataItem;

    const nameLast = useMemo(() => getTitle(ropstenNetData[index-1]?.name), [index]);
    const nameTemp = useMemo(() => getTitle(ropstenNetData[index]?.name), [index]);
    const showTitle = useMemo(() => nameTemp !== nameLast, [nameTemp, nameLast]);

    return (
        <>
            {showTitle ? <div className={styles.title}>{nameTemp}</div> : null}
            <div key={index} className={styles.cardBox}>
                <div className={styles.name}>{name}</div>
                <div
                    className={styles.price}>{centsToUsd(usdPriceInCents)} / {changeWeiToEth(ethPriceInWei)}</div>
                <div className={styles.info}>
                    <div className={styles.total}>{parseValue(usdCapitalization)}</div>
                    <div
                        className={+percentageChange > 1 ? styles.success : styles.mines && styles.percentageChange}>{getFormatPercentageChange(percentageChange)}</div>
                </div>
            </div>
        </>
    )
}

const CardIndexes = React.memo(CardIndexesInner)
export default CardIndexes;
