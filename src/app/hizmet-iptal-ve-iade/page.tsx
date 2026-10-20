import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { getLegal } from "@/content/legal";

const doc = getLegal("hizmet-iptal-ve-iade")!;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/hizmet-iptal-ve-iade" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
