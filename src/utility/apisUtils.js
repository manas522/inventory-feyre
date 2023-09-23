import { sizes, resellers } from "../constants/app";
import {Error} from "../services/error";
export const bulkSellReturnPayloadResellerCheck = (payload) => {
    const payload_resllers = Object.keys(payload);
    if (payload_resllers.length === 0) {
        return `Invalid Empty numbers of reseller in request`;
    }
    if (payload_resllers.length > resellers.length) {
        Error(`Invalid number of reseller in request ${payload_resllers.join("")}`);
    }
    for (let i = 0; i < payload_resllers.length; i += 1) {
        const reseller = payload_resllers[i];
        if (!resellers.includes(reseller)) {
            // reseller is not in acceptable list.
            Error(`Incorrect seller in request ${reseller}`)
            return false;
        }
        // check for size and valid number quantity for each reseller.
        if (!bulkSellReturnSizePayloadCheck(payload[reseller])) {
            return false;
        }
    }
    return true;
}

export const bulkSellReturnSizePayloadCheck = (reseller) => {
    // check for size and valid number quantity for each reseller.
    const payload_sizes = Object.keys(reseller);
    for (let j = 0; j < payload_sizes.length; j += 1) {
        const size = payload_sizes[j];
        if (!sizes.list.includes(size)) {
            Error(`Incorrect size in request ${size}`);
            return false;
        }
        if (typeof reseller[size] !== typeof 1) {
            Error(`Incorrect size quantity type of ${reseller} for ${size} in request`);
            return false;
        }
    }
    return true;
}

export const prepareReturnSellerAPIQuery = (payload) => {
    const query = {}
    const sellers = Object.keys(payload);
    sellers.forEach((seller) => {
        const sizes = Object.keys(payload[seller]);
        sizes.forEach(size => {
            query[`${seller}.${size}`] = payload[seller][size];
        })
    })
    return query;
}