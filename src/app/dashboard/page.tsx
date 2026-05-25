import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CalendarDays, MessageCircle, UsersRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth-options";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const initials =
    session.user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "LL";

  return (
    <main className="min-h-dvh bg-[#f7f8fb] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
              LL
            </div>
            <div>
              <p className="text-sm font-semibold">LINK LIFE</p>
              <p className="text-xs text-zinc-500">Community workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              {session.user.image ? (
                <AvatarImage src={session.user.image} alt="" />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium">{session.user.name}</p>
              <p className="truncate text-sm text-zinc-500">{session.user.email}</p>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <Button className="w-full justify-start" variant="secondary">
              <MessageCircle className="size-4" />
              メッセージ
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <UsersRound className="size-4" />
              コミュニティ
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              <CalendarDays className="size-4" />
              イベント
            </Button>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <Badge variant="secondary" className="rounded-lg">
              ログイン済み
            </Badge>
            <h1 className="mt-4 text-2xl font-semibold">
              おかえりなさい、{session.user.name}。
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              ここからプロフィール、コミュニティ、メッセージの画面につなげられます。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["未読メッセージ", "8", "今日確認したい会話"],
              ["参加コミュニティ", "3", "趣味と地域のつながり"],
              ["近日イベント", "2", "今週の予定"],
            ].map(([label, value, description]) => (
              <div
                key={label}
                className="rounded-lg border border-zinc-200 bg-white p-5"
              >
                <p className="text-sm text-zinc-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold">{value}</p>
                <p className="mt-2 text-sm text-zinc-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
