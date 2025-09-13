export type User = {
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Analyst" | "Advertiser";
  status: "Active" | "Pending";
  avatar: string;
};

export const users: User[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    role: "Admin",
    status: "Active",
    avatar: "https://picsum.photos/seed/10/40/40",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    role: "Editor",
    status: "Active",
    avatar: "https://picsum.photos/seed/11/40/40",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    role: "Analyst",
    status: "Pending",
    avatar: "https://picsum.photos/seed/12/40/40",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    role: "Advertiser",
    status: "Active",
    avatar: "https://picsum.photos/seed/13/40/40",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    role: "Analyst",
    status: "Active",
    avatar: "https://picsum.photos/seed/14/40/40",
  },
];
