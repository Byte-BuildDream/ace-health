export function createNotifyCard({
  title = '系统通知',
  content = '这是一条默认通知',
  atMobiles = [],
  isAtAll = false,
  color = 'blue',
}: {
  title?: string;
  content?: string;
  atMobiles?: string[];
  isAtAll?: boolean;
  color?: 'carmine'|'orange'|'wathet'|'turquoose'|'green'|'yellow'| 'red'| 'violet'|'purple'|'indigo'|'grey'| 'default'| 'blue';
}) {
  // 构建 @ 提醒的文本片段
  const atSegments = [
    ...atMobiles.map((mobile) => `<at phone=${mobile}></at>`),
    ...(isAtAll ? ['<at id=all></at>'] : []),
  ];

  // 如果有 @ 对象，在内容末尾追加提醒
  const finalContent = atSegments.length > 0
    ? `${content}\n\n${atSegments.join(' ')}`
    : content;

  return {
    config: {
      wide_screen_mode: true,
    },
    header: {
      template: color,
      title: {
        content: title,
        tag: 'plain_text',
      },
    },
    elements: [
      {
        tag: 'div',
        text: {
          content: finalContent, // 👈 在这里统一渲染 @ 提醒
          tag: 'lark_md',
        },
      },
      // ✅ 移除原来的 note 区块 —— 因为 note 不支持 at 标签
    ],
  };
}