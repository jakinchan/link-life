import type { User } from "next-auth";

export type DemoUser = User & {
  username: string;
};

export const demoPassword = "linklife";

export const demoUsers: DemoUser[] = [
  {
    id: "alice",
    name: "Alice",
    username: "alice",
    email: "alice@example.com",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "bob",
    name: "Bob",
    username: "bob",
    email: "bob@example.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
  },
  {
    id: "charlie",
    name: "Charlie",
    username: "charlie",
    email: "charlie@example.com",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  },
];
