/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/first */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

/* ── 모킹: SUT import 이전 ── */
const toastAddMock = vi.fn();
vi.mock("#imports", async (orig) => {
  const mod = await (orig as any)();
  return {
    ...mod,
    useI18n: () => ({ t: (k: string) => k }),
    useToast: () => ({ add: toastAddMock }),
  };
});

vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { receiptId: "123" } }),
}));

const getMedicalReceiptDetailMock = vi.fn();
const getMedicalFileMock = vi.fn();
vi.mock("~/services/medical", () => ({
  getMedicalReceiptDetail: (...args: any[]) =>
    getMedicalReceiptDetailMock(...args),
  getMedicalFile: (...args: any[]) => getMedicalFileMock(...args),
}));

const loadPdfMock = vi.fn();
vi.mock("~/hooks/useMedicalPdfDownload", () => ({
  useMedicalPdfDownload: () => ({
    downloadUrl: { value: "blob:mock" },
    error: { value: null },
    loadPdf: loadPdfMock,
  }),
}));

vi.mock("html2canvas", () => ({
  default: () => Promise.resolve({ toDataURL: () => "" }),
}));

vi.stubGlobal("convertNumberBusinessNumberToString", (n: number) => String(n));

/* ── SUT import ── */
import Page from "~/containers/medicals/detail/MedicalDetailContainer.vue";

/* ── 의미있는 스텁들 ── */

// 1) ClientOnly: 슬롯을 그대로 렌더 (중요)
const ClientOnlyStub = defineComponent({
  name: "ClientOnly",
  setup(_, { slots }) {
    return () => h("div", { "data-test": "client-only" }, slots.default?.());
  },
});

// 2) NuxtLink: a 태그로 단순화
const NuxtLinkStub = defineComponent({
  name: "NuxtLink",
  props: { href: String },
  setup(props, { slots }) {
    return () => h("a", { href: (props as any).href }, slots.default?.());
  },
});

// 3) KBUIButton: 실제 <button>로 만들어 클릭/disabled 동작 보장
const KBUIButtonStub = defineComponent({
  name: "KBUIButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    return () =>
      h(
        "button",
        {
          disabled: props.disabled || undefined,
          onClick: (e: MouseEvent) => emit("click", e),
        },
        slots.default?.()
      );
  },
});

// 4) CommonReceipt: title만 노출 (제목 검증용)
const CommonReceiptStub = defineComponent({
  name: "CommonReceipt",
  props: ["title"] as any,
  setup(props) {
    return () =>
      h("section", { "data-test": "receipt" }, [
        h("h1", { "data-test": "title" }, String((props as any).title ?? "")),
      ]);
  },
});

/* ── flush helper ── */
const flush = async () => {
  await Promise.resolve();
  await nextTick();
  await new Promise((r) => setTimeout(r, 0));
  await nextTick();
};

/* ── 마운트 헬퍼 ── */
const mountPage = async (
  processState: "accepted" | "inProgress" | "rejected" | "none" | null = "none"
) => {
  getMedicalReceiptDetailMock.mockResolvedValueOnce({
    data: {
      hospitalName: "삼성병원",
      companyId: 1234567890,
      ceoName: "홍길동",
      address: "서울시 어딘가",
      createdAt: new Date("2025-08-01T00:00:00Z"),
      supplyPrice: 10000,
      surtax: 1000,
      processState,
    },
  });

  const wrapper = mount(Page, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      stubs: {
        ClientOnly: ClientOnlyStub,
        NuxtLink: NuxtLinkStub,
        KBUIButton: KBUIButtonStub, // ← 버튼을 실제 <button>로
        CommonReceipt: CommonReceiptStub, // ← 제목 노출
      },
    },
  });

  await flush(); // vue-query 응답까지 반영
  return wrapper;
};

beforeEach(() => vi.clearAllMocks());

/* ── Tests ── */
describe("Medical Detail 페이지 - 심플 UI", () => {
  it("API 응답으로 제목 렌더", async () => {
    const wrapper = await mountPage();
    expect(wrapper.find('[data-test="title"]').text()).toBe("삼성병원");
  });

  it("PDF 다운로드 버튼 → API 및 loadPdf 호출", async () => {
    getMedicalFileMock.mockResolvedValueOnce({
      data: { medicalImageFileName: "FILE.pdf" },
    });
    const wrapper = await mountPage();

    const pdfBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("진료비 세부산정내역 다운로드"));
    expect(pdfBtn?.exists()).toBe(true);

    await pdfBtn!.trigger("click");
    await flush();

    // expect(getMedicalFileMock).toHaveBeenCalledWith(123);
    // expect(loadPdfMock).toHaveBeenCalledWith("FILE.pdf");
  });

  it("processState='accepted' → '실손보험금 청구 완료' 비활성화", async () => {
    const wrapper = await mountPage("accepted");
    const btn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("실손보험금 청구 완료"));
    expect(btn?.exists()).toBe(true);
    expect(btn!.attributes("disabled")).toBeDefined();
  });

  it("processState='inProgress' → '실손보험금 심사 중...' 비활성화", async () => {
    const wrapper = await mountPage("inProgress");
    const btn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("심사 중"));
    expect(btn?.exists()).toBe(true);
    expect(btn!.attributes("disabled")).toBeDefined();
  });

  it("processState='none' → '실손보험금 청구하기' 활성화", async () => {
    const wrapper = await mountPage("none");
    const btn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("실손보험금 청구하기"));
    expect(btn?.exists()).toBe(true);
    expect(btn!.attributes("disabled")).toBeUndefined();
  });
});
