import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { mount } from "@vue/test-utils";
import LoginContainer from "~/containers/auth/LoginContainer.vue";
import { nextTick } from "vue";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

vi.mock("~/services/auth", () => ({
  postLogin: vi.fn(),
}));

vi.mock("~/utils/token", () => ({
  setTokens: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const createWrapper = () =>
  mount(LoginContainer, {
    global: {
      plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
    },
  });

describe("로그인 페이지 테스트", () => {
  it("버튼 클릭 시 PIN 입력이 화면에 반영된다", async () => {
    const wrapper = createWrapper();
    const getButtonByText = (text: string) =>
      wrapper.findAll("button").find((btn) => btn.text().trim() === text);

    await getButtonByText("1")?.trigger("click");
    await getButtonByText("2")?.trigger("click");
    await nextTick();

    const pinInputs = wrapper.findAll('input[type="password"]');
    const filledInputs = pinInputs.filter(
      (input) => (input.element as HTMLInputElement).value !== ""
    );

    expect(filledInputs.length).toBe(2);
  });

  it("10번 버튼은 0으로 입력된다", async () => {
    const wrapper = createWrapper();
    const getButtonByText = (text: string) =>
      wrapper.findAll("button").find((btn) => btn.text().trim() === text);

    await getButtonByText("0")?.trigger("click");
    await nextTick();

    const pinInputs = wrapper.findAll('input[type="password"]');
    const filledValues = pinInputs
      .map((input) => (input.element as HTMLInputElement).value)
      .filter((val) => val !== "");

    expect(filledValues).toEqual(["0"]);
  });

  it("backspace 버튼은 마지막 값을 제거한다", async () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll("button");

    await buttons[0].trigger("click");
    await nextTick();

    const backspaceBtn = wrapper
      .findAll("button")
      .find((btn) => btn.html().includes("backspace"));
    await backspaceBtn?.trigger("click");
    await nextTick();

    expect(wrapper.vm.pinNumber).toEqual([]);
  });

  it("6자리가 입력되기 전까지 확인 버튼은 비활성화된다", async () => {
    const wrapper = createWrapper();
    const confirmButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("확인"));

    expect(confirmButton?.exists()).toBe(true);
    expect(confirmButton?.attributes("disabled")).toBe("");
  });

  it("6자리 입력되면 확인 버튼이 활성화된다", async () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll("button");

    for (let i = 0; i < 6; i++) {
      await buttons[i].trigger("click");
    }
    await nextTick();

    const confirmBtn = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("확인"));
    expect(confirmBtn?.attributes("disabled")).toBeUndefined();
  });

  it("로그인 실패 시 페이지 이동이 발생하지 않는다", async () => {
    const { postLogin } = await import("~/services/auth");

    (postLogin as Mock).mockRejectedValueOnce(new Error("401 Unauthorized"));

    const routerPush = vi.fn();

    // 👉 `vue-router` 모듈 자체를 모킹
    vi.mock("vue-router", () => ({
      useRouter: () => ({ push: routerPush }),
    }));

    const wrapper = mount(LoginContainer, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: new QueryClient() }]],
      },
    });

    // 6자리 입력
    const buttons = wrapper.findAll("button");
    for (let i = 0; i < 6; i++) {
      await buttons[i].trigger("click");
    }

    const confirmBtn = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("확인"));
    await confirmBtn?.trigger("click");
    await nextTick();

    // ❗ push가 호출되지 않아야 함
    expect(routerPush).not.toHaveBeenCalled();
  });
});
