import type {
    CorporateCardTotalPrice,
    CorporateCardListCursor,
} from "@/types/business"

import { apiClient } from "./apiClient";

export const getCorporateCardTotalPrice = async() => {
    return apiClient.get<CorporateCardTotalPrice>("/ceo/corporateCardCost")
};

export const getCorporateCardListCursor = async() => {
    return apiClient.get<CorporateCardListCursor>("/ceo/corporateCard")
};