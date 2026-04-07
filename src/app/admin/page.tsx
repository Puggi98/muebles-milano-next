import { prisma } from "@/lib/prisma";
import { AdminSettingsClient } from "./page-client";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();

  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return <AdminSettingsClient initialSettings={settingsMap} />;
}
