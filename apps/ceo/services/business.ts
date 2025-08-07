import type {
    CorporateCardTotalPrice,
    CorporateCardListCursor,
    ReceiptFilter,
} from "@/types/business"

import { apiClient } from "./apiClient";

export const getCorporateCardTotalPrice = async() => {
    return apiClient.get<CorporateCardTotalPrice>("/ceo/corporateCardCost")
};

export const getCorporateCardListCursor = async(params: ReceiptFilter) => {
    return apiClient.get<CorporateCardListCursor>("/ceo/corporateCard", {
        params: params,
    })
};