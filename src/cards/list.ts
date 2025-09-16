export interface FeishuListItem {
  [key: string]: any;
}

export type ListItemRenderer = (
  item: FeishuListItem,
  index: number,
  list: FeishuListItem[]
) => string;

export function createFeishuListCard({
  title = '系统通知',
  list = [],
  renderItem,
  headerText = '**数据列表报告**',
  atMobiles = [],
  isAtAll = false,
  color = 'blue',
  wideScreen = true,
}: {
  title?: string;
  list?: FeishuListItem[];
  renderItem: ListItemRenderer;
  headerText?: string; // 列表上方的说明文字（如“仓库开放PR每日报告”）
  atMobiles?: string[];
  isAtAll?: boolean;
  color?: 'carmine' | 'orange' | 'wathet' | 'turquoise' | 'green' | 'yellow' | 'red' | 'violet' | 'purple' | 'indigo' | 'grey' | 'default' | 'blue';
  wideScreen?: boolean;
}) {
  // 构建 @ 提醒片段
  const atSegments = [
    ...atMobiles.map((mobile) => `<at phone=${mobile}></at>`),
    ...(isAtAll ? ['<at id=all></at>'] : []),
  ];

  // 渲染每一项为 div 元素
  const listElements = list.map((item, index) => ({
    tag: 'div',
    text: {
      tag: 'lark_md',
      content: renderItem(item, index, list),
    },
  }));

  // 构建提醒 note 元素（飞书推荐用 note 展示 @ 提醒）
  const noteElement = atSegments.length > 0
    ? {
        tag: 'note',
        elements: [
          {
            tag: 'plain_text',
            content: atSegments.join(' '),
          },
        ],
      }
    : null;

  return {
    config: {
      wide_screen_mode: wideScreen,
    },
    header: {
      template: color,
      title: {
        content: title,
        tag: 'plain_text',
      },
    },
    elements: [
      // 头部说明文字
      {
        tag: 'div',
        text: {
          tag: 'lark_md',
          content: headerText,
        },
      },
      // 列表内容
      ...listElements,
      // 提醒（如果有）
      ...(noteElement ? [noteElement] : []),
    ],
  };
}