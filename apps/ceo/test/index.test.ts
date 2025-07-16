// test/index.test.ts
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import IndexPage from "../pages/index.vue";

describe("랜딩 페이지 테스트", () => {
  it("UI 요소가 정상적으로 렌더링된다", async () => {
    const wrapper = await mountSuspended(IndexPage);

    expect(wrapper.text()).toContain("웹 페이지 테스트");
    expect(wrapper.text()).toContain("카운트:");

    // ★★★ 변경된 부분: CSS 선택자로 UButton 찾기 ★★★
    // UButton은 결국 <button> 태그로 렌더링되므로, 'button' 태그를 찾습니다.
    // 만약 페이지에 여러 버튼이 있다면, 특정 클래스나 속성으로 더 구체적으로 찾을 수 있습니다.
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);

    // 버튼의 텍스트가 '테스트'인지 확인합니다.
    expect(button.text()).toBe("카운트 증가");
  });

  it("버튼 클릭 시 카운트가 증가한다", async () => {
    const wrapper = await mountSuspended(IndexPage);

    const initialCountText = wrapper.find(".text-2xl.font-bold").text();
    expect(initialCountText).toContain("카운트: 0");

    // ★★★ 변경된 부분: CSS 선택자로 UButton 찾기 ★★★
    const button = wrapper.find("button");

    await button.trigger("click");
    await wrapper.vm.$nextTick();

    const updatedCountText = wrapper.find(".text-2xl.font-bold").text();
    expect(updatedCountText).toContain("카운트: 1");

    await button.trigger("click");
    await wrapper.vm.$nextTick();

    const finalCountText = wrapper.find(".text-2xl.font-bold").text();
    expect(finalCountText).toContain("카운트: 2");
  });
});
