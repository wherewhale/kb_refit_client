export const getIcon = (
  label: string
): { background: string; emoji: string } => {
  if (label.includes("스타포인트")) {
    return { background: "bg-green-1", emoji: "💰" };
  } else if (label.includes("배지")) {
    return { background: "bg-blue-1", emoji: "🏅" };
  } else if (label.includes("탄소중립")) {
    return { background: "bg-yellow-1", emoji: "🌱" };
  } else if (label.includes("브네")) {
    return { background: "bg-yellow-1", emoji: "🍖" };
  } else if (label.includes("STARBUCKS")) {
    return { background: "bg-green-1", emoji: "☕️" };
  } else {
    return { background: "bg-gray-1", emoji: "⚪️" };
  }
};

export const getPeriodNumber = (period: string): number | undefined => {
  switch (period) {
    case "common.filter.1month":
      return 1;
    case "common.filter.3month":
      return 3;
    case "common.filter.6month":
      return 6;
    default:
      return undefined;
  }
};

export const getSortOrder = (sort: string): "LATEST" | "OLDEST" => {
  switch (sort) {
    case "common.filter.newest":
      return "LATEST";
    case "common.filter.past_order":
      return "OLDEST";
    default:
      return "LATEST";
  }
};

export const getRewardType = (type: string): string => {
  switch (type) {
    case "point.filter.accumulated_points":
      return "CARBONPOINT";
    case "point.filter.discount_amount":
      return "CASHBACK";
    default:
      return "ALL";
  }
};

export const getReceiptPaymentType = (
  type: string
): "APPROVED" | "CANCELED" | "ALL" => {
  switch (type) {
    case "receipt.filter.approval":
      return "APPROVED";
    case "receipt.filter.cancel":
      return "CANCELED";
    default:
      return "ALL";
  }
};

export const getReceiptFilter = (
  filter: string
): "ALL" | "PROCESSED" | "UNPROCESSED" => {
  switch (filter) {
    case "receipt.filter.receipt_processing":
      return "PROCESSED";
    case "receipt.filter.receipt_unprocessing":
      return "UNPROCESSED";
    default:
      return "ALL";
  }
};

export const convertNumberBusinessNumberToString = (
  businessNumber: number
): string => {
  let strBusinessNumber = businessNumber.toString();
  while (strBusinessNumber.length < 10) {
    strBusinessNumber = "0" + strBusinessNumber;
  }
  return strBusinessNumber.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
};

export const getReceiptProgressButtonText = (
  state: string
): {
  label: string;
  disabled: boolean;
} => {
  // accepted, rejected, inProgress, deposit, none
  switch (state) {
    case "none":
      return {
        label: "경비 처리하기",
        disabled: false,
      };
    case "inProgress":
      return {
        label: "경비 처리 중",
        disabled: true,
      };
    case "accepted":
      return {
        label: "이미 처리된 영수증입니다.",
        disabled: true,
      };
    case "rejected":
      return {
        label: "경비 처리하기",
        disabled: false,
      };
    case "deposit":
      return {
        label: "법인 처리 불가로 입금 처리",
        disabled: true,
      };
    default:
      return {
        label: "경비 처리하기",
        disabled: false,
      };
  }
};
