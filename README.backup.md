<div align="center">
  <img src="src/logo.jpg" alt="Multi-Language Lorem Ipsum" width="200"/>
  
  # Multi-Language Lorem Ipsum Generator
  
  ### 🌍 Generate lorem ipsum text in 9 languages with 6 topic-based categories
  
  [![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/yourusername/multi-language-lorem)
  [![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-007ACC.svg)](https://code.visualstudio.com/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  
  **یک اکستنشن قدرتمند VS Code برای تولید متن لورم به ۹ زبان مختلف با ۶ دسته‌بندی موضوعی**
  
  [English](#english-documentation) | [فارسی](#persian-documentation)
  
</div>

---

## ویژگی‌ها

- 🌍 **چند زبانه**: پشتیبانی از ۹ زبان مختلف

  - انگلیسی (English)
  - فارسی (Persian)
  - عربی (Arabic)
  - چینی (Chinese)
  - ژاپنی (Japanese)
  - روسی (Russian)
  - اسپانیایی (Spanish)
  - فرانسوی (French)
  - آلمانی (German)

- � **۶ دسته موضوعی**:

  - 🏖️ گردشگری (Tourism)
  - ⚕️ پزشکی (Medical)
  - 💻 فناوری (Technology)
  - 💼 کسب‌وکار (Business)
  - 📚 آموزش (Education)
  - 🍽️ غذا (Food)

- 📏 **۳ طول متن**:

  - کوتاه (۱ جمله)
  - متوسط (۲-۳ جمله)
  - بلند (۵+ جمله)

- 🎲 **تنوع بالا**: هر دسته و سایز شامل چندین متن مختلف است که به صورت تصادفی انتخاب می‌شود
- ⌨️ **درج آسان**: متن مستقیماً در محل کرسر شما درج می‌شود
- 📁 **ساختار ماژولار**: هر زبان در فایل جداگانه‌ای سازماندهی شده
- 🔄 **عدم تکرار**: با هر بار اجرا، احتمال دریافت متن متفاوت وجود دارد

## نحوه استفاده

### روش ۱: استفاده از Command Palette

1. کلید `Ctrl+Shift+P` (یا `Cmd+Shift+P` در مک) را فشار دهید
2. تایپ کنید `Lorem` تا لیست دستورات نمایش داده شود
3. یکی از گزینه‌های زیر را انتخاب کنید:

   - `Lorem: Generate English Text`
   - `Lorem: Generate Persian Text (فارسی)`
   - `Lorem: Generate Arabic Text (العربية)`
   - `Lorem: Generate Chinese Text (中文)`
   - `Lorem: Generate Japanese Text (日本語)`
   - `Lorem: Generate Russian Text (Русский)`
   - `Lorem: Generate Spanish Text (Español)`
   - `Lorem: Generate French Text (Français)`
   - `Lorem: Generate German Text (Deutsch)`
   - `Lorem: Generate Custom Text` (برای انتخاب زبان و دسته)

4. طول متن مورد نظر (کوتاه، متوسط، یا بلند) را انتخاب کنید
5. متن در محل کرسر شما درج می‌شود!

### روش ۲: استفاده از Custom Generator

برای کنترل کامل:

1. دستور `Lorem: Generate Custom Text` را اجرا کنید
2. ابتدا زبان مورد نظر را انتخاب کنید
3. سپس دسته موضوعی (گردشگری، پزشکی، فناوری و...) را انتخاب کنید
4. در نهایت طول متن را مشخص کنید

## مثال‌ها

### فارسی - گردشگری (متوسط):

```
سفری به یاد ماندنی را با بازدید از جاذبه‌های گردشگری بی‌نظیر تجربه کنید. از کوهستان‌های مرتفع تا سواحل زیبا، هر مقصد داستانی دارد. تورهای گردشگری ما با راهنمایان حرفه‌ای و برنامه‌ریزی دقیق، لحظات فراموش‌نشدنی را برای شما رقم می‌زنند.
```

### انگلیسی - فناوری (کوتاه):

```
Innovative software solutions powering digital transformation across industries.
```

### عربی - پزشکی (بلند):

```
حلول رعاية صحية متقدمة مع تكنولوجيا طبية حديثة وأطباء خبراء. منشأتنا الطبية توفر خدمات تشخيصية شاملة وعلاجات متخصصة وخطط رعاية شخصية...
```

## نصب

1. پروژه را باز کنید
2. `F5` را فشار دهید تا Extension Development Host اجرا شود
3. در پنجره جدید VS Code، اکستنشن فعال است

## توسعه

### پیش‌نیازها

- Node.js 18.x یا بالاتر
- VS Code 1.85.0 یا بالاتر

### راه‌اندازی پروژه

```bash
# نصب dependencies
npm install

# کامپایل TypeScript
npm run compile

# اجرا در حالت watch
npm run watch
```

### اجرای اکستنشن

1. در VS Code، `F5` را فشار دهید
2. یک پنجره جدید با عنوان "Extension Development Host" باز می‌شود
3. در این پنجره، `Ctrl+Shift+P` را فشار دهید و دستورات lorem را امتحان کنید

## ساختار پروژه

```
.
├── src/
│   ├── extension.ts          # کد اصلی اکستنشن
│   └── lorem-data/           # داده‌های لورم برای هر زبان
│       ├── english.ts        # متن‌های انگلیسی
│       ├── persian.ts        # متن‌های فارسی
│       ├── arabic.ts         # متن‌های عربی
│       ├── chinese.ts        # متن‌های چینی
│       ├── japanese.ts       # متن‌های ژاپنی
│       ├── russian.ts        # متن‌های روسی
│       ├── spanish.ts        # متن‌های اسپانیایی
│       ├── french.ts         # متن‌های فرانسوی
│       └── german.ts         # متن‌های آلمانی
├── .vscode/
│   ├── launch.json           # تنظیمات دیباگ
│   └── tasks.json            # تنظیمات task
├── package.json              # تنظیمات و وابستگی‌ها
├── tsconfig.json             # تنظیمات TypeScript
└── README.md                 # این فایل
```

## دسته‌بندی‌های موجود

هر زبان شامل ۶ دسته موضوعی است:

- **🏖️ گردشگری (Tourism)**: متن‌های مرتبط با سفر، جهانگردی و مکان‌های دیدنی
- **⚕️ پزشکی (Medical)**: متن‌های مرتبط با سلامت، درمان و خدمات پزشکی
- **💻 فناوری (Technology)**: متن‌های مرتبط با نرم‌افزار، فناوری و نوآوری
- **💼 کسب‌وکار (Business)**: متن‌های مرتبط با مشاوره، مدیریت و تجارت
- **📚 آموزش (Education)**: متن‌های مرتبط با آموزش، یادگیری و مدارس
- **🍽️ غذا (Food)**: متن‌های مرتبط با غذا، آشپزی و رستوران

## توسعه‌های آینده

- [ ] اتصال به API خارجی برای تولید متن‌های پویا با AI
- [ ] افزودن زبان‌های بیشتر (کره‌ای، ترکی، ایتالیایی و...)
- [ ] افزودن دسته‌های موضوعی بیشتر (ورزش، هنر، علم و...)
- [ ] امکان تنظیم طول دقیق متن (تعداد کاراکتر یا کلمه)
- [ ] ذخیره زبان و دسته پیش‌فرض کاربر
- [ ] افزودن snippet برای دسترسی سریع‌تر
- [ ] امکان ویرایش و سفارشی‌سازی متن‌ها

## مجوز

MIT

## مشارکت

هر گونه پیشنهاد و بهبود خوشایند است!
