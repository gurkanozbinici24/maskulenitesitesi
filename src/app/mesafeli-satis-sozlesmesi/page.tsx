import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { getLegal } from "@/content/legal";

const doc = getLegal("mesafeli-satis-sozlesmesi")!;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.description,
  alternates: { canonical: "/mesafeli-satis-sozlesmesi" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
