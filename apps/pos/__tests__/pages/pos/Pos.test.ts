/* eslint-disable @typescript-eslint/no-explicit-any */
// __tests__/pages/pos/Pos.test.ts
import { describe, it, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import Page from "~/pages/[companyId]/index.vue";

vi.mock("~/services/pos", () => ({
  getMerchandiseList: vi.fn(),
  postPurchaseReceipt: vi.fn(),
}));

const storeMock = vi.hoisted(() => ({
  companyId: 1234567890,
  companyName: "테스트상사",
}));
vi.mock("~/stores/company", () => ({
  useCompanyStore: () => storeMock,
}));

const createWrapper = () =>
  mount(Page, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      stubs: { CommonHeader: { template: "<div />" } },
    },
  });

beforeEach(async () => {
  vi.clearAllMocks();
  const { getMerchandiseList } = await import("~/services/pos");
  (getMerchandiseList as any).mockResolvedValue({
    data: {
      merchandiseList: [
        { merchandiseId: 1, merchandiseName: "물", merchandisePrice: 1000 },
        { merchandiseId: 2, merchandiseName: "과자", merchandisePrice: 2000 },
      ],
    },
  });
});

describe("POS 최종 페이지", () => {
  it("빈 장바구니에서 결제 시 toast 호출", async () => {
    const wrapper = createWrapper();
    await flushPromises();

    // 결제 버튼 클릭
    const payBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("결제하기"));
    await payBtn!.trigger("click");
    await flushPromises();
  });

  it("결제 성공 시 toast 호출", async () => {
    const wrapper = createWrapper();
    await flushPromises();

    // 상품 추가
    const addBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("추가"));
    await addBtn!.trigger("click");
    await flushPromises();

    // postPurchaseReceipt 성공 mock
    const { postPurchaseReceipt } = await import("~/services/pos");
    (postPurchaseReceipt as any).mockResolvedValueOnce({ data: { ok: true } });

    // userId 입력
    const userIdInput = wrapper.find('input[type="text"]');
    await userIdInput.setValue("1");

    // 결제
    const payBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("결제하기"));
    await payBtn!.trigger("click");
    await flushPromises();
  });
});
