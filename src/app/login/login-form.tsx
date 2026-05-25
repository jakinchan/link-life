"use client";

import { ArrowRight, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoPassword, demoUsers } from "@/lib/demo-users";
import { cn } from "@/lib/utils";

type LoginFormProps = {
  callbackUrl: string;
};

function pathFromUrl(url: string | null | undefined, fallback: string) {
  if (!url) {
    return fallback;
  }

  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return url.startsWith("/") && !url.startsWith("//") ? url : fallback;
  }
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(demoUsers[0]?.email ?? "");
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const selectedUser = useMemo(
    () => demoUsers.find((user) => user.email === email),
    [email]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsPending(false);

    if (!result?.ok) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }

    router.push(pathFromUrl(result.url, callbackUrl));
    router.refresh();
  }

  return (
    <main className="min-h-dvh bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_42%,#f8f3e8_100%)] text-foreground">
      <div className="mx-auto grid min-h-dvh w-full max-w-6xl grid-cols-1 lg:grid-cols-[1fr_420px]">
        <section className="flex min-h-[42dvh] flex-col justify-between px-6 py-6 sm:px-10 lg:min-h-dvh lg:py-10">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
              LL
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-950">
              LINK LIFE
            </span>
          </div>

          <div className="max-w-xl py-12 lg:py-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white/70 px-3 py-2 text-sm text-zinc-700 shadow-sm">
              <ShieldCheck className="size-4 text-emerald-700" />
              コミュニティとメッセージを安全に管理
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              大切なつながりに、すぐ戻れる場所。
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-700">
              プロフィール、コミュニティ、ダイレクトメッセージをひとつの入口から確認できます。
            </p>
          </div>

          <div className="hidden grid-cols-3 gap-3 lg:grid">
            {demoUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  setEmail(user.email ?? "");
                  setPassword(demoPassword);
                  setError("");
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg border bg-white/70 p-3 text-left shadow-sm transition hover:border-zinc-400",
                  selectedUser?.id === user.id
                    ? "border-zinc-950"
                    : "border-zinc-200"
                )}
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-9 rounded-full bg-zinc-200" />
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-zinc-950">
                    {user.name}
                  </span>
                  <span className="block truncate text-xs text-zinc-500">
                    {user.email}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex items-center px-4 pb-8 sm:px-8 lg:px-0 lg:py-10">
          <Card className="w-full rounded-lg border border-zinc-200 bg-white/95 shadow-xl shadow-zinc-950/10">
            <CardHeader className="gap-2 px-6 pt-6">
              <CardTitle className="text-xl">ログイン</CardTitle>
              <CardDescription>
                登録済みアカウントで Link Life に入ります。
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-10 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-10 pl-9"
                      required
                    />
                  </div>
                </div>

                {error ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="h-10 w-full" disabled={isPending}>
                  {isPending ? (
                    "確認中"
                  ) : (
                    <>
                      <LogIn className="size-4" />
                      ログイン
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-5 grid gap-2 sm:hidden">
                {demoUsers.map((user) => (
                  <Button
                    key={user.id}
                    type="button"
                    variant="outline"
                    className="h-10 justify-between"
                    onClick={() => {
                      setEmail(user.email ?? "");
                      setPassword(demoPassword);
                      setError("");
                    }}
                  >
                    {user.name}
                    <ArrowRight className="size-4" />
                  </Button>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                デモパスワード: <span className="font-medium">{demoPassword}</span>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
