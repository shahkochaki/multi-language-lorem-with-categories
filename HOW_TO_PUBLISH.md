# 🚀 راهنمای انتشار در VS Code Marketplace

## ✅ Package موفقیت‌آمیز بود!

فایل `multi-language-lorem-with-categories-1.0.1.vsix` با موفقیت ساخته شد! 🎉

## 📋 مراحل انتشار در Marketplace:

### مرحله 1: دریافت Personal Access Token از Azure DevOps

1. به https://dev.azure.com بروید
2. اگر اکانت ندارید، با Microsoft Account خود sign up کنید
3. روی avatar خود کلیک کنید و **"Personal Access Tokens"** را انتخاب کنید
4. **"+ New Token"** را کلیک کنید
5. تنظیمات زیر را انجام دهید:
   - **Name**: VS Code Extension Publishing
   - **Organization**: All accessible organizations
   - **Expiration**: 90 days (یا مدت دلخواه)
   - **Scopes**: Custom defined
   - **Marketplace**: ✅ Manage
6. **Create** را کلیک کنید
7. ⚠️ **مهم**: Token را کپی و در جای امنی ذخیره کنید (فقط یکبار نمایش داده می‌شود!)

### مرحله 2: ایجاد Publisher در Marketplace

1. به https://marketplace.visualstudio.com/manage بروید
2. با همان Microsoft Account که token ساختید login کنید
3. **"Create Publisher"** را کلیک کنید
4. اطلاعات زیر را وارد کنید:
   - **Publisher ID**: `shahkochaki` (همان نامی که در package.json است)
   - **Display Name**: نام نمایشی شما
   - **Description**: توضیحات کوتاه درباره شما
5. **Create** را کلیک کنید

### مرحله 3: Login با vsce

در terminal بزنید:

```bash
vsce login shahkochaki
```

وقتی Personal Access Token را درخواست کرد، Token از مرحله 1 را paste کنید.

### مرحله 4: Publish Extension

```bash
vsce publish
```

یا برای publish با افزایش patch version:

```bash
vsce publish patch
```

یا برای افزایش minor version:

```bash
vsce publish minor
```

## 🎯 دستورات مفید:

### تست Local

```bash
# نصب فایل .vsix به صورت دستی در VS Code
code --install-extension multi-language-lorem-with-categories-1.0.1.vsix
```

### به‌روزرسانی در آینده

```bash
# افزایش patch version (1.0.1 -> 1.0.2)
vsce publish patch

# افزایش minor version (1.0.1 -> 1.1.0)
vsce publish minor

# افزایش major version (1.0.1 -> 2.0.0)
vsce publish major
```

### Unpublish (حذف از marketplace)

```bash
vsce unpublish shahkochaki.multi-language-lorem-with-categories
```

## ⚠️ نکات مهم:

### قبل از Publish:

- ✅ مطمئن شوید README کامل است
- ✅ لوگو در محل صحیح قرار دارد
- ✅ CHANGELOG به‌روز است
- ✅ Version number صحیح است
- ✅ Repository URL صحیح است

### بعد از Publish:

- Extension معمولاً ظرف 5-10 دقیقه در marketplace ظاهر می‌شود
- لینک extension: `https://marketplace.visualstudio.com/items?itemName=shahkochaki.multi-language-lorem-with-categories`
- کاربران می‌توانند از داخل VS Code آن را نصب کنند

## 📊 آمار فایل Package شده:

- 📦 نام فایل: `multi-language-lorem-with-categories-1.0.1.vsix`
- 📏 حجم: 556.68 KB
- 📁 تعداد فایل‌ها: 343
- 🗂️ شامل: کد، node_modules، مستندات، لوگو

## 🔧 بهینه‌سازی (اختیاری):

برای کاهش حجم extension، می‌توانید:

1. **Bundle کردن با webpack** - حجم را به شدت کم می‌کنه
2. **به‌روزرسانی .vscodeignore** - فایل‌های غیرضروری را حذف کنید

اگر می‌خواهید bundle کنید، بهم بگید تا راهنمایی کنم.

## 💡 لینک‌های مفید:

- 📖 Documentation: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- 🔑 Personal Access Tokens: https://dev.azure.com
- 🏪 Marketplace Management: https://marketplace.visualstudio.com/manage
- 📊 Extension Analytics: https://marketplace.visualstudio.com/manage/publishers/shahkochaki

## 🎉 موفق باشید!

Extension شما آماده است! فقط مراحل بالا را دنبال کنید و publish کنید.

اگر سوالی داشتید، بپرسید! 🚀
