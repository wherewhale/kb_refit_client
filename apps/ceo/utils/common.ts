
export const getPeriodNumber = (value: string) => {
    switch(value) {
        case "1개월":
            return 1;
        case "3개월":
            return 3;
        case "6개월":
            return 6;
        default:
            return undefined;
    }
}

export const getSortOrder = (value: string) => {
    switch(value) {
        case "최신순":
            return "NEWEST"
        case "과거순":
            return "OLDEST"
        default:
            return "NEWEST"
    }
}

export const getCompletedReceiptFilter = (value: string): "WHOLE" | "PROCESS" | "UNPROCESS" | "WHOLE" | "REJECTED" | "DEPOSIT" | "INPROGRESS" => {
    switch(value) {
        case "경비 승인":
            return "PROCESS"
        case "경비 반려":
            return "UNPROCESS"
        case "미반려":
            return "INPROGRESS";
        case "반려/미환급":
            return "REJECTED";
        case "환급":
            return "DEPOSIT"
        default:
            return "WHOLE"
    }
}

export const getRefundStateFilter = (value: string): "WHOLE" | "UNREFUND" | "REFUND" => {
    switch(value) {
        case "승인":
            return "REFUND"
        case "취소":
            return "UNREFUND"
        default:
            return "WHOLE"
    }
}