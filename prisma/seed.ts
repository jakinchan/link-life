import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice",
      username: "alice",
      email: "alice@example.com",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=80",
      bio: "コミュニティとつながることが好きです。",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob",
      username: "bob",
      email: "bob@example.com",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
      bio: "東京で活動するプロダクトデザイナーです。",
    },
  });

  const charlie = await prisma.user.upsert({
    where: { email: "charlie@example.com" },
    update: {},
    create: {
      name: "Charlie",
      username: "charlie",
      email: "charlie@example.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
      bio: "新しいコミュニティとイベントに参加するのが好きです。",
    },
  });

  const community = await prisma.community.upsert({
    where: { slug: "link-life" },
    update: {},
    create: {
      name: "Link Life",
      slug: "link-life",
      description: "共通の趣味や関心でつながる交流コミュニティです。",
      memberships: {
        create: [
          { user: { connect: { id: alice.id } }, role: "ADMIN" },
          { user: { connect: { id: bob.id } } },
          { user: { connect: { id: charlie.id } } },
        ],
      },
      posts: {
        create: [
          {
            author: { connect: { id: alice.id } },
            title: "はじめまして！リンクライフへようこそ",
            content: "Link Life では、自分の興味に合わせたコミュニティに参加できます。みなさんの自己紹介をお待ちしています！",
          },
          {
            author: { connect: { id: bob.id } },
            title: "週末のイベント情報",
            content: "次の週末に渋谷でユーザーグループを開催します。参加希望者はこのスレッドで返信してください。",
          },
        ],
      },
    },
  });

  await prisma.messageThread.create({
    data: {
      title: "Alice と Bob のメッセージ",
      members: {
        create: [
          { user: { connect: { id: alice.id } } },
          { user: { connect: { id: bob.id } } },
        ],
      },
      messages: {
        create: [
          {
            sender: { connect: { id: alice.id } },
            content: "こんにちは Bob！今度のイベントについて話したいです。",
          },
          {
            sender: { connect: { id: bob.id } },
            content: "こんにちは Alice！ぜひ詳細を教えてください。",
          },
        ],
      },
    },
  });

  await prisma.messageThread.create({
    data: {
      title: "Alice と Charlie のメッセージ",
      members: {
        create: [
          { user: { connect: { id: alice.id } } },
          { user: { connect: { id: charlie.id } } },
        ],
      },
      messages: {
        create: [
          {
            sender: { connect: { id: charlie.id } },
            content: "Alice さん、こんにちは！今週末のコミュニティミートアップに参加しますか？",
          },
          {
            sender: { connect: { id: alice.id } },
            content: "こんにちは Charlie！ぜひ参加したいです。時間と場所を教えてください。",
          },
        ],
      },
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
