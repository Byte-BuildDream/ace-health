#!/usr/bin/env bun
import { sendFeishuCard } from './utils/sendCard';
import { createNotifyCard } from './cards/notify';
import { createFeishuListCard } from './cards/list';

async function main() {
  const card = createNotifyCard({
    title: '🎉 欢迎使用飞书卡片脚本合集',
    content: '这是由 **Bun** 编写的飞书卡片工具，支持快速发送多种模板卡片！',
    atMobiles: ['<at id=all>'], // 替换为你想@的人手机号
    color: 'red',
  });

  await sendFeishuCard(card);

  const todos = [
    { type: "请假", user: "张三", days: 3, submitAt: "2025-04-01", link: "https://oa.com/1" },
    { type: "采购申请", user: "李四", amount: "¥12,000", submitAt: "2025-03-28", link: "https://oa.com/2" },
  ];

  const todoCard = createFeishuListCard({
    title: "待审批事项提醒",
    headerText: "**你有以下待审批事项**",
    list: todos,
    renderItem: (item, idx) => {
      const daysPending = Math.floor(
        (Date.now() - new Date(item.submitAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      const urgency = daysPending >= 3
        ? `<font color="red">（已积压 ${daysPending} 天）</font>`
        : daysPending >= 1
          ? `<font color="orange">（${daysPending} 天）</font>`
          : '';

      return `${idx + 1}. [**${item.type}**](${item.link}) ${urgency}\n   - 申请人：@${item.user}\n   - ${
        item.amount ? `金额：${item.amount}` : `时长：${item.days}天`
      }`;
    },
    color: "wathet",
  });

  await sendFeishuCard(todoCard);
}

main();