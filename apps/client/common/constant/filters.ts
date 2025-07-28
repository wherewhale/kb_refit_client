export const FILTER_LABEL_KEYS: Record<string, string> = {
  기간: "common.filter.period",
  종류: "common.filter.type",
  정렬: "common.filter.sort",
  필터: "common.filter.filter",
};

export const POINT_FILTER_KEYS = {
  기간: [
    "common.filter.1month",
    "common.filter.3month",
    "common.filter.6month",
    "common.filter.input",
  ],
  종류: [
    "common.filter.entire",
    "point.filter.accumulated_points",
    "point.filter.discount_amount",
  ],
  정렬: [
    "common.filter.latest",
    "common.filter.past_order",
  ],
};

export const RECEIPT_FILTER_KEYS = {
  기간: [
    "common.filter.1month",
    "common.filter.3month",
    "common.filter.6month",
    "common.filter.input",
  ],
  종류: [
    "common.filter.entire",
    "receipt.filter.approval",
    "receipt.filter.cancel",
  ],
  정렬: [
    "common.filter.latest",
    "common.filter.past_order",
  ],
  필터: [
    "common.filter.entire",
    "receipt.filter.receipt_processing",
    "receipt.filter.receipt_unprocessing",
  ],
};

export const MEDICAL_FILTER_KEYS = {
  기간: [
    "common.filter.1month",
    "common.filter.3month",
    "common.filter.6month",
    "common.filter.input",
  ],
  종류: [
    "common.filter.entire",
    "receipt.filter.approval",
    "receipt.filter.cancel",
  ],
  정렬: [
    "common.filter.latest",
    "common.filter.past_order",
  ],
  필터: [
    "common.filter.entire",
    "medical.filter.insurance_claim",
    "medical.filter.insurance_non-claim",
  ],
};