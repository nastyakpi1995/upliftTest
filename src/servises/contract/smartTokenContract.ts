import Web3 from "web3";
import { AbiItem } from "web3-utils";
import SMART_CONTACT from './SMART_CONTACT.json'
import {IRopstenNetDataItem} from "../../types/interfeces";

const key = process.env.REACT_APP_KEY ? process.env.REACT_APP_KEY : '73f10c0589bb4e92a78759d36f76dd51'
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS ? process.env.REACT_APP_CONTRACT_ADDRESS : '0x4f7f1380239450AAD5af611DB3c3c1bb51049c29'

const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${key}`))
const smartTokenContract = new web3.eth.Contract(SMART_CONTACT as AbiItem[], contractAddress)

interface IGroup {
    name: string;
    indexes: string[];
}
const sortRopstenNet = (ropstenNetData:IRopstenNetDataItem[]) => {
    const callback = ((a:IRopstenNetDataItem,b: IRopstenNetDataItem) => a.name.localeCompare(b.name))

    return [...ropstenNetData].sort(callback)
}


const requestGroupIdArrayAsync = () => {
    return smartTokenContract.methods.getGroupIds().call().then((response: string[]) => {
        return response
    })
}

const requestGetIndexIdArrayAsync = async (groupId: string) => {
    return smartTokenContract.methods.getGroup(groupId).call().then((response: IGroup) => {
        return response.indexes
    })
}
const requestGetIndexArrayAsync = async (indexId: string) => {
    return smartTokenContract.methods.getIndex(indexId).call().then((response: IRopstenNetDataItem[]) => {

        return response
    })
}


const getIntens = async () => {
    let groupIdArray: string[]=[];
    let indexIdArray: string[]=[];
    let resultArray: IRopstenNetDataItem[]=[];

    groupIdArray = await requestGroupIdArrayAsync()

    for (let i = 0; i < groupIdArray.length; i++) {
        const getIndex = await requestGetIndexIdArrayAsync(groupIdArray[i])

        indexIdArray = indexIdArray.concat(getIndex)
    }

    for (let i = 0; i < indexIdArray.length; i++) {
        const getItem = await requestGetIndexArrayAsync(indexIdArray[i])

        resultArray = [...resultArray, getItem]
    }

    return sortRopstenNet(resultArray)
}



export { web3, getIntens }

