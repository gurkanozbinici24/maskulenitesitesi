import crypto from "crypto";

/**
 * iyzico REST istemcisi (IYZWSv2 imzası). Resmi npm paketi Vercel'de dosya
 * okuma sorunları çıkardığı için doğrudan HTTP ile konuşuyoruz.
 *
 * Gerekli ortam değişkenleri (Vercel > Settings > Environment Variables):
 *  - IYZICO_API_KEY
 *  - IYZICO_SECRET_KEY
 *  - IYZICO_BASE_URL  (canlı: https://api.iyzipay.com, test: https://sandbox-api.iyzipay.com)
 */

export function iyzicoHazirMi(): boolean {
  return Boolean(process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY);
}

function baseUrl() {
  return (process.env.IYZICO_BASE_URL || "https://api.iyzipay.com").replace(/\/+$/, "");
}

export async function iyzicoIstek<T = Record<string, unknown>>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  if (!apiKey || !secretKey) throw new Error("iyzico anahtarları tanımlı değil");

  const json = JSON.stringify(body);
  const randomKey = `${Date.now()}${crypto.randomBytes(6).toString("hex")}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(randomKey + path + json)
    .digest("hex");
  const auth = Buffer.from(
    `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`,
  ).toString("base64");

  const res = await fetch(baseUrl() + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `IYZWSv2 ${auth}`,
      "x-iyzi-rnd": randomKey,
    },
    body: json,
    cache: "no-store",
  });
  return (await res.json()) as T;
}

export interface CheckoutBaslatCevap {
  status: "success" | "failure";
  errorCode?: string;
  errorMessage?: string;
  token?: string;
  paymentPageUrl?: string;
}

export interface CheckoutSonucCevap {
  status: "success" | "failure";
  errorMessage?: string;
  paymentStatus?: "SUCCESS" | "FAILURE" | "INIT_THREEDS" | "CALLBACK_THREEDS" | string;
  paymentId?: string;
  conversationId?: string;
  basketId?: string;
  price?: number;
  paidPrice?: number;
  installment?: number;
  cardAssociation?: string;
  lastFourDigits?: string;
  fraudStatus?: number;
}
