import axios from 'axios';
import { config } from 'dotenv';


config({ path: '../.env' });

console.log('Loaded env:', process.env.FEISHU_WEBHOOK_URL);

const webhookUrl = process.env.FEISHU_WEBHOOK_URL;

if (!webhookUrl) {
  throw new Error('请在 .env 中设置 FEISHU_WEBHOOK_URL');
}

export async function sendFeishuCard(card: any) {
  try {
    const res = await axios.post(webhookUrl!, {
      msg_type: 'interactive',
      card,
    });

    if (res.data.code === 0) {
      console.log('✅ 飞书卡片发送成功');
    } else {
      console.error('❌ 发送失败:', res.data);
    }
  } catch (error) {
    console.error('❌ 请求异常:', error);
  }
}


