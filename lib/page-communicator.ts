// 消息类型枚举
export enum MessageType {
  Online = 'online',      // 页面上线
  Ack = 'ack',            // 确认收到
  Heartbeat = 'heartbeat',// 心跳检测
  Offline = 'offline'     // 页面下线
}

// 消息数据结构
interface MessageData {
  type: MessageType;
  from: string;
  to?: string;
  timestamp: number;
}

export default class PageCommunicator {
  private channel: BroadcastChannel;
  private pageId: string;
  private alivePages: Set<string>;
  private heartbeatInterval: NodeJS.Timeout;

  constructor(channelName = 'site-pages-communication') {
    this.channel = new BroadcastChannel(channelName);
    this.pageId = this.generatePageId();
    this.alivePages = new Set([this.pageId]);
    this.heartbeatInterval = setInterval(() => {}, 0); // 初始化
    this.init();
  }

  // 生成唯一页面ID
  private generatePageId(): string {
    return `page-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  // 初始化通信
  private init(): void {
    // 发送上线消息
    this.send({ type: MessageType.Online });

    // 监听消息
    this.channel.addEventListener('message', (e: MessageEvent<MessageData>) => {
      const { type, from } = e.data;

      // 忽略自己发送的消息
      if (from === this.pageId) return;

      switch (type) {
        case MessageType.Online:
          this.alivePages.add(from);
          // 回复确认消息
          this.send({ type: MessageType.Ack, to: from });
          break;

        case MessageType.Ack:
          this.alivePages.add(from);
          break;

        case MessageType.Heartbeat:
          this.alivePages.add(from);
          break;

        case MessageType.Offline:
          this.alivePages.delete(from);
          break;
      }
    });

    // 页面关闭时发送下线消息
    window.addEventListener('beforeunload', () => {
      this.send({ type: MessageType.Offline });
      this.channel.close();
    });

    // 定期发送心跳
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: MessageType.Heartbeat });
    }, 3000);
  }

  // 发送消息
  public send(message: Omit<MessageData, 'from' | 'timestamp'>): void {
    const data: MessageData = {
      ...message,
      from: this.pageId,
      timestamp: Date.now()
    };
    this.channel.postMessage(data);
  }

  // 检查是否有其他存活页面
  public hasOtherAlivePages(): boolean {
    return this.alivePages.size > 1;
  }

  // 获取当前存活页面ID列表
  public getAlivePages(): string[] {
    return Array.from(this.alivePages);
  }

  // 销毁实例
  public destroy(): void {
    clearInterval(this.heartbeatInterval);
    this.channel.close();
  }
}
