import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { getLegal } from "@/content/legal";

const doc = getLegal("gizlilik-politikasi")!;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
