<template>
  <div>
    <!-- 버튼 테스트 전체를 감싸는 루트 div -->

    <!-- 버튼 그룹 -->
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; padding: 2rem">
      <!-- primary -->
      <KBUIButton variant="primary" size="large">button</KBUIButton>
      <KBUIButton variant="primary" size="medium">button</KBUIButton>
      <KBUIButton variant="primary" size="small">button</KBUIButton>

      <!-- primary_circle -->
      <KBUIButton variant="primary" size="large" shape="circle">button</KBUIButton>
      <KBUIButton variant="primary" size="medium" shape="circle">button</KBUIButton>
      <KBUIButton variant="primary" size="small" shape="circle">button</KBUIButton>

      <!-- outlined -->
      <KBUIButton variant="outlined" size="large">button</KBUIButton>
      <KBUIButton variant="outlined" size="medium">button</KBUIButton>
      <KBUIButton variant="outlined" size="small">button</KBUIButton>

      <!-- outlined_circle -->
      <KBUIButton variant="outlined" size="large" shape="circle">button</KBUIButton>
      <KBUIButton variant="outlined" size="medium" shape="circle">button</KBUIButton>
      <KBUIButton variant="outlined" size="small" shape="circle">button</KBUIButton>

      <!-- secondary -->
      <KBUIButton variant="secondary" size="large">button</KBUIButton>
      <KBUIButton variant="secondary" size="medium">button</KBUIButton>
      <KBUIButton variant="secondary" size="small">button</KBUIButton>

      <!-- ghost -->
      <KBUIButton variant="ghost" size="large">button</KBUIButton>
      <KBUIButton variant="ghost" size="medium">button</KBUIButton>
      <KBUIButton variant="ghost" size="small">button</KBUIButton>

      <!-- secondary-ghost -->
      <KBUIButton variant="secondary-ghost" size="large">button</KBUIButton>
      <KBUIButton variant="secondary-ghost" size="medium">button</KBUIButton>
      <KBUIButton variant="secondary-ghost" size="small">button</KBUIButton>
    </div>


    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; padding: 2rem">

        <!-- Brand -->
        <div style="background-color: #FFBC00; width: 150px; height: 150px;">#FFBC00</div>
        <div style="background-color: #FFCC02; width: 150px; height: 150px;">#FFCC02</div>
        <div style="background-color: #8D744A; width: 150px; height: 150px;">#FFBC00</div>
        <div style="background-color: #84888A; width: 150px; height: 150px;">#84888A</div>
        <div style="background-color: #545045; width: 150px; height: 150px;">#545045</div>
        <div style="background-color: #60584D; width: 150px; height: 150px;">#60584D</div>

        <!-- Sub -->
        <div style="background-color: #DEF6ED; width: 150px; height: 150px;">#DEF6ED</div>
        <div style="background-color: #72C2A8; width: 150px; height: 150px;">#72C2A8</div>
        <div style="background-color: #EEE3FF; width: 150px; height: 150px;">#EEE3FF</div>
        <div style="background-color: #DCF4FE; width: 150px; height: 150px;">#DCF4FE</div>
        <div style="background-color: #1C60FF; width: 150px; height: 150px;">#1C60FF</div>
        <div style="background-color: #FFF3CA; width: 150px; height: 150px;">#FFF3CA</div>
        <div style="background-color: #FFE7E7; width: 150px; height: 150px;">#FFE7E7</div>
        <div style="background-color: #FC2E6C; width: 150px; height: 150px;">#FC2E6C</div>

        <!-- Gray Scale -->
        <div style="background-color: #000000; width: 150px; height: 150px;">#000000</div>
        <div style="background-color: #454F5D; width: 150px; height: 150px;">#454F5D</div>
        <div style="background-color: #838A9A; width: 150px; height: 150px;">#838A9A</div>
        <div style="background-color: #D9D9D9; width: 150px; height: 150px;">#D9D9D9</div>
        <div style="background-color: #EAEDEF; width: 150px; height: 150px;">#EAEDEF</div>
        <div style="background-color: #F5F6F7; width: 150px; height: 150px;">#F5F6F7</div>
        <div style="background-color: #FFFFFF; width: 150px; height: 150px;">#FFFFFF</div>
    </div>

    <!-- Typography -->
    <div style="padding: 2rem">
      <KBUITypography weight="bold" size="h36">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="h36">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="h36">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="h32">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="h32">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="h32">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="h24">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="h24">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="h24">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b20">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b20">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b20">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b18">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b18">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b18">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b16">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b16">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b16">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b15">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b15">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b15">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b14">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b14">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b14">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b13">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b13">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b13">가나다라마바사아자차카타파하</KBUITypography>

      <KBUITypography weight="bold" size="b12">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="medium" size="b12">가나다라마바사아자차카타파하</KBUITypography>
      <KBUITypography weight="regular" size="b12">가나다라마바사아자차카타파하</KBUITypography>
    </div>
  </div>
</template>