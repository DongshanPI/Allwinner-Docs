<template>
  <div class="footer-wrap">
    <div class="contact-wrap">
      <div class="mark">
        <div>联系我们</div>
        <div class="icon-box">
          <!--qq-->
          <svg
            class="Zi Zi--QQ Login-socialIcon"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            @click="toOpen(1)"
          >
            <path
              d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <!--wx-->
          <svg
            class="Zi Zi--WeChat Login-socialIcon"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            @click="toOpen(2)"
          >
            <path
              d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
              fill-rule="evenodd"
            ></path>
          </svg>
          <!--wb-->
          <svg
            class="Zi Zi--Weibo Login-socialIcon"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            @click="toOpen(3)"
          >
            <path
              d="M15.518 3.06c8.834-.854 7.395 7.732 7.394 7.731-.625 1.439-1.673.309-1.673.309.596-7.519-5.692-6.329-5.692-6.329-.898-1.067-.029-1.711-.029-1.711zm4.131 6.985c-.661 1.01-1.377.126-1.376.126.205-3.179-2.396-2.598-2.396-2.598-.719-.765-.091-1.346-.091-1.346 4.882-.551 3.863 3.818 3.863 3.818zM5.317 7.519s4.615-3.86 6.443-1.328c0 0 .662 1.08-.111 2.797.003-.003 3.723-1.96 5.408.159 0 0 .848 1.095-.191 2.649 0 0 2.918-.099 2.918 2.715 0 2.811-4.104 6.44-9.315 6.44-5.214 0-8.026-2.092-8.596-3.102 0 0-3.475-4.495 3.444-10.33zm10.448 7.792s.232-4.411-5.71-4.207c-6.652.231-6.579 4.654-6.579 4.654.021.39.097 3.713 5.842 3.713 5.98 0 6.447-4.16 6.447-4.16zm-9.882.86s-.059-3.632 3.804-3.561c3.412.06 3.206 3.165 3.206 3.165s-.026 2.979-3.684 2.979c-3.288 0-3.326-2.583-3.326-2.583zm2.528 1.037c.672 0 1.212-.447 1.212-.998 0-.551-.543-.998-1.212-.998-.672 0-1.215.447-1.215.998 0 .551.546.998 1.215.998z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <div class="content">
        <div>电话：0755-86200561</div>
        <div>广东省深圳市龙岗区布吉南湾街道平吉大道建异大厦B1508</div>
      </div>
    </div>
    <div class="record">
      Copyright © 2019-2022 深圳百问网科技有限公司 All Rights Reserved.<span
        class="record-num"
        @click="toOpen(0)"
        >粤ICP备13035650号</span
      >
    </div>
  </div>
</template>
  <script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Footer',
})
</script>
  <script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const url = {
  0: 'https://beian.miit.gov.cn/#/Integrated/index',
  1: 'https://wpa.qq.com/msgrd?v=3&uin=1402284892&site=qq&menu=yes&jumpflag=1',
  2: 'https://www.100ask.net/',
  3: 'https://weibo.com/888wds?topnav=1&wvr=6'
}
const toOpen = (val) => window.open(url[val])
</script>
<style lang="scss" scoped>
.footer-wrap {
  width: 100%;
  padding: 0 25px;
  padding-top: 33px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 400;
  color: #888;
  .contact-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    .content,
    .mark {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: normal;
    }
    .mark {
      width: 105px;
      padding-right: 32px;
      border-right: solid 1px #888;
      .icon-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .Zi {
            fill: #888;
            &:hover {
            fill: rgb(52, 168, 85);
          }
        }
        .weixin {
          position: relative;
          img {
            display: none;
            position: absolute;
            width: 90px;
            height: 90px;
            left: 50%;
            bottom: 38px;
            transform: translateX(-50%);
            z-index: 1;
          }
          &:hover {
            img {
              display: block;
            }
          }
        }
      }
    }
    .content {
      padding-left: 32px;
    }
  }
  .record,
  .tip {
    height: 48px;
    margin: 0 auto;
    text-align: center;
    // line-height: 48px;
  }
  .record {
    padding: 20px;
    .record-num {
      text-decoration: underline;
      margin-left: 8px;
      cursor: pointer;
    }
  }
  .tip {
    border-top: 1px solid #2d2c2e;
  }
}
</style>