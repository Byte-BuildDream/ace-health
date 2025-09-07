// test/integration.test.ts
import { test, expect } from 'bun:test';
import { createNotifyCard } from '../cards/notify'; // 从上一步重构后的 index.ts 导出
import { sendFeishuCard } from '../utils/sendCard';

// 可选：加个环境变量保护，避免误发
if (!process.env.FEISHU_INTEGRATION_TEST) {
  test.todo('Set FEISHU_INTEGRATION_TEST=1 to enable real Feishu card sending');
}

test('integration: should send real feishu card successfully', async () => {
  // 跳过测试，除非明确启用
  if (!process.env.FEISHU_INTEGRATION_TEST) {
    return;
  }

const colors = [
  'carmine',
  'orange',
  'wathet',
  'turquoose',
  'green',
  'yellow',
  'red',
  'violet',
  'purple',
  'indigo',
  'grey',
  'default',
  'blue',
] as const; // 👈 关键！告诉 TS：这不是 string[]，而是每个元素都是字面量！
  // 准备测试数据（发到你自己 or 测试群）
  const result = await createNotifyCard({
    title: '🧪 集成测试卡片',
    content: '这是一条由 **Bun 集成测试** 自动发送的真实卡片，请忽略。',
    atMobiles: [], // 不@人，避免骚扰
    color: 'blue',
  });




  await sendFeishuCard(result);

  for (let i = 0; i < colors.length; i++ ) {
    await sendFeishuCard(createNotifyCard({
      title: '🧪 集成测试卡片',
      content: '这是一条由 **Bun 集成测试** 自动发送的真实卡片，请忽略。' + colors[i],
      atMobiles: [], // 不@人，避免骚扰
      color: colors[i],
    }));

  }
  // ✅ 基础断言：确保返回了卡片对象
  // expect(result).toBeDefined();
  // expect(result.title).toBe('🧪 集成测试卡片');

  // ✅ 可选：如果你的 sendFeishuCard 返回 API 响应，可以断言成功状态
  // 例如：expect(apiResponse.code).toBe(0);

  console.log('✅ 集成测试卡片已发送，请到飞书确认是否收到');
}, 10000); // 增加超时，避免网络慢导致失败