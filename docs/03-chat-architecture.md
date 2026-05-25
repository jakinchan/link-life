チャットはChatServiceで抽象化する。

初期：
- PrismaChatService
- MessageThread / Message テーブル
- DB保存型チャット

将来：
- Socket.IOでリアルタイム化
- Matrix / XMPP / Zulip風トピックチャットをAdapter化

禁止：
- UIから直接Messageを更新しない
- チャットOSSを本体に直結しない
- GPL/AGPL系コードを直接組み込まない
