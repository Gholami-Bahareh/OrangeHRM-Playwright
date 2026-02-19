// tests/global-setup.js
import { chromium } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../page-objects/LoginPage.js';

export default async () => {
  // مرورگر رو لانچ می‌کنیم
  const browser = await chromium.launch();

  // ⚡️ ایجاد context با baseURL
  const context = await browser.newContext({
    baseURL: 'https://opensource-demo.orangehrmlive.com'
  });

  // صفحه جدید از context می‌سازیم
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  // مسیر نسبی با baseURL کار می‌کنه
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  // صبر می‌کنیم تا داشبورد لود بشه
  await page.waitForURL('/web/index.php/dashboard/index');

  // ذخیره‌ی auth state برای استفاده در تست‌ها
  await context.storageState({
    path: path.resolve('.auth/auth.json')
  });

  await browser.close();
};
