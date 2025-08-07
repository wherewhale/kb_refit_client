
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
            return "Newest"
        case "과거순":
            return "Oldest"
        default:
            return "Newest"
    }
}

export const getCompletedReceiptFilter = (value: string): "Whole" | "Process" | "UnProcess" => {
    switch(value) {
        case "경비 승인":
            return "Process"
        case "경비 반려":
            return "UnProcess"
        default:
            return "Whole"
    }
}