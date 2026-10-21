// Kullanım: EKITAP_SIFRE_ANAHTARI=<base64 32 bayt> node scripts/ekitap-sifrele.mjs <girdi.pdf> <cikti.enc>
// Repo herkese açık olduğu için e-kitaplar AES-256-GCM ile şifrelenip öyle saklanır.
import crypto from "crypto";
import fs from "fs";
const key = Buffer.from(process.env.EKITAP_SIFRE_ANAHTARI || "", "base64");
if (key.length !== 32) throw new Error("EKITAP_SIFRE_ANAHTARI 32 baytlık base64 olmalı");
const [, , girdi, cikti] = process.argv;
const iv = crypto.randomBytes(12);
const c = crypto.createCipheriv("aes-256-gcm", key, iv);
const enc = Buffer.concat([c.update(fs.readFileSync(girdi)), c.final()]);
fs.writeFileSync(cikti, Buffer.concat([iv, c.getAuthTag(), enc]));
console.log("yazıldı:", cikti);
