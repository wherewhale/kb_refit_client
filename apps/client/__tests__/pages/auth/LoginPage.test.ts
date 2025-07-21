// test/PinInput.test.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LoginContainer from "~/containers/auth/LoginContainer.vue"; // 컴포넌트 경로에 맞게 수정
import { nextTick } from "vue";

describe("로그인 페이지 테스트", () => {
  it("버튼 클릭 시 PIN 입력이 화면에 반영된다", async () => {
    const wrapper = mount(LoginContainer);

    const getButtonByText = (text: string) =>
      wrapper.findAll("button").find((btn) => btn.text().trim() === text);

    await getButtonByText("1")?.trigger("click");
    await getButtonByText("2")?.trigger("click");
    await nextTick();

    const pinInputs = wrapper.findAll('input[type="password"]');
    const filledInputs = pinInputs.filter(
      (input) => (input.element as HTMLInputElement).value !== "",
    );

    expect(filledInputs.length).toBe(2); // ✅ 입력된 개수만 체크
  });

  it("10번 버튼은 0으로 입력된다", async () => {
    const wrapper = mount(LoginContainer);
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
    const wrapper = mount(LoginContainer);
    const buttons = wrapper.findAll("button");

    await buttons[0].trigger("click"); // 입력: 1
    await nextTick();

    const backspaceBtn = wrapper
      .findAll("button")
      .find((btn) => btn.html().includes("backspace"));
    await backspaceBtn?.trigger("click");
    await nextTick();

    expect(wrapper.vm.pinNumber).toEqual([]);
  });

  it("6자리가 입력되기 전까지 확인 버튼은 비활성화된다", async () => {
    const wrapper = mount(LoginContainer);
    const confirmButton = wrapper
      .findAll("button")
      .find((btn) => btn.text().includes("확인"));

    expect(confirmButton?.exists()).toBe(true);

    expect(confirmButton?.attributes("disabled")).toBe("");
  });

  it("6자리 입력되면 확인 버튼이 활성화된다", async () => {
    const wrapper = mount(LoginContainer);
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
});
