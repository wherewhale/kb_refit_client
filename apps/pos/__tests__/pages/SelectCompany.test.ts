/* eslint-disable @typescript-eslint/no-explicit-any */
// __tests__/pages/SelectCompany.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import Page from "~/pages/index.vue";

const routerMock = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("vue-router", () => ({
  useRouter: () => routerMock,
}));

const storeMock = vi.hoisted(() => ({
  onChangeCompany: vi.fn(),
  reset: vi.fn(),
}));
vi.mock("~/stores/company", () => ({
  useCompanyStore: () => storeMock,
}));

// utils (템플릿에서 사용)
vi.mock("~/utils/common", () => ({
  convertNumberBusinessNumberToString: vi.fn(() => "123-45-67890"),
}));

// 서비스 mock: 팩토리 내부에서 외부 변수 참조 없이 빈 함수만 제공
vi.mock("~/services/pos", () => ({
  getCompanyList: vi.fn(),
}));

// ────────────────────────────────────────────────────────────
const createWrapper = () =>
  mount(Page, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
    },
  });

beforeEach(async () => {
  vi.clearAllMocks();

  // 각 테스트 시작 시 기본 응답 주입
  const { getCompanyList } = await import("~/services/pos");
  (getCompanyList as any).mockResolvedValue({
    data: {
      list: [
        {
          companyId: 1234567890,
          companyName: "테스트상사",
          ceoName: "홍길동",
          address: "서울시 어딘가 1-2-3",
        },
        {
          companyId: 1112223334,
          companyName: "샘플상회",
          ceoName: "이몽룡",
          address: "부산시 어딘가 9-8-7",
        },
      ],
    },
  });
});

describe("회사 선택 페이지", () => {
  it("리스트가 렌더링되고, onMounted에서 reset이 호출된다", async () => {
    const wrapper = createWrapper();
    await flushPromises();

    // 리스트 렌더 확인
    const items = wrapper.findAll("li");
    expect(items.length).toBe(2);
    expect(wrapper.text()).toContain("테스트상사");
    expect(wrapper.text()).toContain("샘플상회");

    // reset 호출 확인 (같은 인스턴스)
    const { useCompanyStore } = await import("~/stores/company");
    const s = useCompanyStore() as any;
    expect(s.reset).toHaveBeenCalledTimes(1);
  });

  it("선택하기 클릭 시 onChangeCompany와 라우팅이 호출된다", async () => {
    const wrapper = createWrapper();
    await flushPromises();

    // 첫 번째 항목의 '선택하기' 버튼 클릭
    const selectBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("선택하기"));
    expect(selectBtn).toBeTruthy();

    await selectBtn!.trigger("click");
    await flushPromises();

    // store 검증 (같은 인스턴스)
    const { useCompanyStore } = await import("~/stores/company");
    const s = useCompanyStore() as any;
    expect(s.onChangeCompany).toHaveBeenCalledTimes(1);
    expect(s.onChangeCompany.mock.calls[0][0].companyId).toBe(1234567890);
  });
});
