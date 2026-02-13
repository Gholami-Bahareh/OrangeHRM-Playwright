const { test : baseTest } = require('@playwright/test');
const path = require('path');

const myTest = baseTest.extend({   //  ایجاد یک نسخه جدید از تست با امکانات اضافه
  //تعریف یه فیکساتور به نام اتنتیکیتد پیج .و. یه اینستنت مرورگر پلیرایت میده .و. این صفحه آماده یا این کانتکست اماده رو بده به تست
  authenticatedPage: async ({ browser }, use) => {  
    //ایجاد یه کانتکست یا مرورگر جدید با استفاده از استوریج استیت که قبلا ذخیره شده
    //ایجاد یه مرورگر مجازی جدید
    const context = await browser.newContext({
      storageState: path.resolve('.auth/auth.json')
    });
    const page = await context.newPage();
    // مستقیم برو روی داشبورد
    await page.goto('/web/index.php/dashboard/index');
    await use(page);
    await context.close();
  },
});

module.exports = { test: myTest };

// exports.test =  test.extend({
//   authenticatedPage: async ({ browser }, use) => {
//     ...
//   },
// });

//  OR

// const myTest = test.extend({
//   authenticatedPage: async ({ browser }, use) => {
//     ...
//   },
// });

// exports.test = myTest;

