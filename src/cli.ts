#!/usr/bin/env bun
import { sendFeishuCard } from './utils/sendCard';
import { createNotifyCard } from './cards/notify';


async function main() {
  const card = createNotifyCard({
    title: '🎉 欢迎使用飞书卡片脚本合集',
    content: '这是由 **Bun** 编写的飞书卡片工具，支持快速发送多种模板卡片！',
    atMobiles: ['<at id=all>'], // 替换为你想@的人手机号
    color: 'red',
  });

  await sendFeishuCard(card);
}

main();