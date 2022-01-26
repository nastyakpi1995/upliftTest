export const parseValue = (value: string) => {
    const valueNum = new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2,useGrouping: true }).format(+value);

    return `$${valueNum}`
};
export const changeWeiToEth = (value: string) => {
    const res = +value / 1000000000000000000

    return `${res.toFixed(2)} ETH`
}

export const centsToUsd = (value:string) => {
    const changeValue = +value  / 100
    return `$${changeValue}`
}
export const getFormatPercentageChange = (value: string) => {
    const refactorValue = +value > 1 ? `+${value}` : value;

    return `${refactorValue}%`
}

export const getTitle = (name: string) => {
    let str;
    if (name) {
        const nameArray = name.split(' ')
        const res = nameArray.slice(0,-1)

        str = res.join(' ')
    }

    return str
}
