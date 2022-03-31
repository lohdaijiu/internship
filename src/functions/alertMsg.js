import { ElMessage } from 'element-plus';
import { h } from 'vue';

// view https://element-plus.org/en-US/component/message.html#types for more details
export function alertMsg(type, msg) {
  ElMessage({
    message: h('p', null, [
      h('span', { style: 'font-family: "Poppins", sans-serif;' }, msg)
    ]),
    type: type,
    offset: 30,
    showClose: true,
    duration: 3000
  });
}
