# 🌍 Multi-Language Lorem Ipsum — VS Code Extension

 <div align="center">

![Multi-Language Lorem Ipsum](./src/logo.png)

### Realistic placeholder text in multiple languages and topic categories

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![VS Code](https://img.shields.io/badge/VS%20Code-1.85%2B-007ACC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6.svg)

Features • Installation • Usage • Configuration • Contributing

 </div>

---

Multi-Language Lorem Ipsum makes your mockups and prototypes feel real. Instead of generic Latin text, insert contextual placeholder content written in your target language and industry domain — great for realistic UI designs, localization previews, documentation samples, and mock data.

This README is intentionally thorough: it documents features, supported languages and categories, configuration options, developer instructions, packaging/publishing steps, contribution workflows, and a short changelog.

---

## 🎯 Key Benefits

- Produce realistic placeholder text in many languages to better reflect localized UI
- Use topic-specific copy (e.g., Medical, Finance, Tourism) for realistic content in mocks
- Multiple variations and lengths reduce repetition and improve realism
- Configurable defaults and an optional "use settings by default" toggle for power users
- Easy to integrate into workflows via Command Palette and keyboard shortcuts

---

## 🌍 Supported Languages (sample)

The extension includes curated content files for these languages (more can be added):

| Language   | Native Name | Script     |
| ---------- | ----------- | ---------- |
| English    | English     | Latin      |
| Persian    | فارسی       | Persian    |
| Arabic     | العربية     | Arabic     |
| Chinese    | 中文        | Chinese    |
| Japanese   | 日本語      | Japanese   |
| Russian    | Русский     | Cyrillic   |
| Spanish    | Español     | Latin      |
| French     | Français    | Latin      |
| German     | Deutsch     | Latin      |
| Italian    | Italiano    | Latin      |
| Portuguese | Português   | Latin      |
| Korean     | 한국어      | Hangul     |
| Hindi      | हिन्दी      | Devanagari |
| Turkish    | Türkçe      | Latin      |
| Dutch      | Nederlands  | Latin      |
| Swedish    | Svenska     | Latin      |
| Norwegian  | Norsk       | Latin      |

If you'd like additional languages, please open an issue or submit a PR following the data structure in `src/lorem-data/`.

---

## 📂 Topic-Based Categories

Each language module contains curated texts for topic categories. Current categories:

- 🏖️ Tourism — travel, destinations, cultural experiences
- ⚕️ Medical — healthcare, medical services, wellness
- 💻 Technology — software, cloud, AI, IT solutions
- 💼 Business — consulting, strategy, corporate services
- 📚 Education — learning, training, academic programs
- 🍽️ Food — culinary, restaurants, menus
- 🏅 Sports — events, training, fixtures, analysis
- 💹 Finance — banking, investing, markets
- 🌱 Environment — sustainability, climate, green tech
- 🎬 Entertainment — film, music, media coverage

These categories are chosen to provide realistic, domain-specific copy for common UI scenarios. You can request new categories or add your own by following the contribution guidelines below.

---

## 📏 Lengths & Variations

Each category contains three length families and multiple variations:

- Short — single-sentence snippets (good for labels and headings)
- Medium — 2–3 sentence descriptions (cards, previews)
- Long — multi-sentence paragraphs (articles, docs)

Each (language, category, length) combination contains multiple variations; the generator picks one at random so repeated insertions produce different content.

---

## 📦 Installation

### From the VS Code Marketplace

1.  Open **VS Code**
2.  Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3.  Search for **"Multi-Language Lorem Ipsum"**
4.  Click **Install**

### Manual / Developer install

```cmd
git clone https://github.com/shahkochaki/multi-language-lorem-with-categories.git
cd multi-language-lorem-with-categories
npm install
npm run compile
# Press F5 in VS Code to launch the Extension Development Host for testing
```

To produce a VSIX package for manual installation or Marketplace upload:

```cmd
npm run compile
npx vsce package
# Install locally: code --install-extension ./multi-language-lorem-with-categories-1.2.0.vsix
```

---

## 🚀 Quick Usage Guide

1.  Place the text cursor where you want placeholder content
2.  Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and type `Lorem`
3.  Choose a language-specific command or `Lorem: Generate Custom Text`
4.  If prompted, select category and length (unless you configured defaults)
5.  The text is inserted at the cursor

### Example Commands

- `Lorem: Generate English Text`
- `Lorem: Generate Persian Text (فارسی)`
- `Lorem: Generate Arabic Text (العربية)`
- `Lorem: Generate Chinese Text (中文)`
- `Lorem: Generate Custom Text` — choose language, category, length

### Keyboard Shortcuts (defaults)

- `Ctrl+Alt+L` / `Cmd+Alt+L` — Open Custom Generator
- `Ctrl+Alt+Shift+E` / `Cmd+Alt+Shift+E` — Quick English Text

Customize these in VS Code's Keyboard Shortcuts to fit your workflow.

---

## ⚙️ Configuration (Settings)

Settings are registered under the `multiLanguageLorem` configuration section. You can open them in Settings or edit your `settings.json`:

- `multiLanguageLorem.defaultLanguage` (string) — e.g. `"english"`
- `multiLanguageLorem.defaultCategory` (string) — e.g. `"tourism"`
- `multiLanguageLorem.defaultLength` (string) — `"short" | "medium" | "long"`
- `multiLanguageLorem.useSettingsByDefault` (boolean) — when true, the extension will apply configured defaults automatically; when false (default), the extension will prompt you even if defaults exist

Behavior notes:

- If a configured default category isn't available for a language, the extension falls back to the language's first available category and shows a small warning.
- The extension shows a one-time tip suggesting you set defaults if you haven't configured any yet; this is non-blocking.

---

## 🔧 Developer & Contribution Guide

We welcome contributions. Follow the steps below to add languages, categories, or improve the extension.

Project layout (important files):

```
multi-language-lorem-with-categories/
├─ src/
│  ├─ extension.ts           # Extension activation and commands
│  └─ lorem-data/            # Language modules (one file per language)
│     ├─ english.ts
│     └─ persian.ts
├─ out/                      # Compiled JS (produced by tsc)
├─ package.json              # VS Code extension manifest
├─ readme.md                 # User-facing README (this file)
├─ README_PROFESSIONAL.md    # Optional additional marketing README
└─ ARRAY_STRUCTURE_GUIDE.md   # How to add languages and maintain structure
```

Adding a new language:

1.  Create `src/lorem-data/<language>.ts` exporting an object with the category keys.
2.  Each category should contain `short`, `medium`, and `long` arrays of strings.
3.  Add an import and register the language in `src/extension.ts` (see existing pattern).
4.  Add a command entry in `package.json` (if you want direct command per language).

Coding & testing flow:

```cmd
npm install
npm run compile
npm run watch     # optional - auto compile during development
# Press F5 in VS Code to run the Extension Development Host
```

---

## 📦 Packaging & Publishing

I generated a VSIX for development. To publish publicly to the Visual Studio Marketplace you need:

1.  A publisher account registered with Visual Studio Marketplace
2.  A Personal Access Token (PAT) with appropriate packaging permissions

Publish steps (local):

```cmd
npx vsce login <publisher>
npx vsce publish
```

OR package and upload manually:

```cmd
npx vsce package
# Upload the produced .vsix from the publisher dashboard
```

If you want, I can prepare release notes and a publish script. I cannot publish on your behalf without your PAT (do not share tokens in chat).

---

## 📖 Examples (snippets)

Short (English — Technology):

> Innovative software solutions powering digital transformation across industries.

Medium (Persian — Tourism):

> سفری به یاد ماندنی را با بازدید از جاذبه‌های گردشگری بی‌نظیر تجربه کنید. از کوهستان‌های مرتفع تا سواحل زیبا، هر مقصد داستانی دارد.

Long (Spanish — Food):

> Creaciones culinarias exquisitas utilizando ingredientes frescos de origen local y recetas auténticas. Nuestros talentosos chefs elaboran platos excepcionales que celebran sabores diversos y tradiciones culinarias. Cada comida es un viaje a través del sabor, la textura y la excelencia en la presentación.

---

## 📊 Current Statistics (approx.)

| Metric                                | Value |
| ------------------------------------- | ----- |
| Languages included                    | 17+   |
| Categories per language               | 10    |
| Text lengths                          | 3     |
| Variations per (lang,category,length) | 2–6   |
| Estimated unique combinations         | 510+  |

---

## 🤝 Contributing

We welcome improvements, new languages, and better texts. Please:

1.  Fork the repo and create a topic branch
2.  Add or update language files under `src/lorem-data/`
3.  Update `extension.ts` imports if you add new direct commands (optional)
4.  Run `npm run lint` and `npm run compile` locally
5.  Open a pull request with a clear description and examples

If you are adding a language, please provide at least 2–3 variations per length per category and ensure Unicode/RTL handling where relevant.

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📈 Changelog (summary)

### v1.2.0 — 2025-10-26

- Added 5 new languages (Hindi, Turkish, Dutch, Swedish, Norwegian)
- Added 4 new categories (Sports, Finance, Environment, Entertainment)
- Added settings: defaultLanguage, defaultCategory, defaultLength, useSettingsByDefault
- Improved generate flow with safe fallbacks and one-time settings suggestion
- Updated README, packaging support and commands

### v1.1.0 — earlier

- Initial multilingual support and category system

---

## 🙏 Acknowledgments

- Built with ❤️ for multilingual projects and realistic mockups.
- Thanks to contributors and users who improve the dataset and translations.

---

## 📧 Support & Contact

- Issues & feature requests: https://github.com/shahkochaki/multi-language-lorem-with-categories/issues
- Email: ali.shahkochaki7@gmail.com

---

If this extension helps you, please star the repository and consider contributing.

## Happy coding! 🚀

## 🎯 Why Choose This Extension?

Traditional lorem ipsum generators provide generic Latin text that doesn't reflect real-world content. **Multi-Language Lorem Ipsum** solves this by offering:

- ✨ **12 World Languages** - Generate placeholder text in the language your project actually uses
- 🎨 **Topic-Based Categories** - Get contextually relevant content for different industries
- 🎲 **Multiple Variations** - Each combination includes 3-4 different texts to avoid repetition
- ⚡ **Instant Insert** - Text appears directly at your cursor position
- ⌨️ **Keyboard Shortcuts** - Quick access with customizable hotkeys
- 📦 **216+ Combinations** - 12 languages × 6 categories × 3 lengths = endless possibilities

---

## 🌟 Features

### 🌍 Multi-Language Support

Generate placeholder text in 12 major world languages:

| Language   | Native Name | Script   | Example                            |
| ---------- | ----------- | -------- | ---------------------------------- |
| English    | English     | Latin    | "Innovative software solutions..." |
| Persian    | فارسی       | Persian  | "سفری به یاد ماندنی را با..."      |
| Arabic     | العربية     | Arabic   | "حلول رعاية صحية متقدمة..."        |
| Chinese    | 中文        | Chinese  | "推动企业增长和卓越..."            |
| Japanese   | 日本語      | Japanese | "息をのむような景色を..."          |
| Russian    | Русский     | Cyrillic | "Откройте для себя..."             |
| Spanish    | Español     | Latin    | "Descubre paisajes..."             |
| French     | Français    | Latin    | "Découvrez des paysages..."        |
| German     | Deutsch     | Latin    | "Entdecken Sie atemberaubende..."  |
| Italian    | Italiano    | Latin    | "Scopri paesaggi mozzafiato..."    |
| Portuguese | Português   | Latin    | "Descubra paisagens..."            |
| Korean     | 한국어      | Hangul   | "숨막히는 풍경을 발견하고..."      |

### 📂 Topic-Based Categories

Each language includes professionally written content for 6 categories:

- 🏖️ **Tourism** - Travel, destinations, cultural experiences, tour packages
- ⚕️ **Medical** - Healthcare, treatments, medical services, patient care
- 💻 **Technology** - Software, digital transformation, IT solutions, development
- 💼 **Business** - Consulting, strategy, corporate services, growth
- 📚 **Education** - Learning, academic programs, schools, training
- 🍽️ **Food** - Culinary, restaurants, gastronomy, recipes

### 📏 Three Text Lengths

- **Short** (1 sentence) - Perfect for headings, labels, and buttons
- **Medium** (2-3 sentences) - Ideal for descriptions, previews, and cards
- **Long** (5+ sentences) - Great for paragraphs, articles, and detailed content

### 🎲 Variation System

Unlike traditional generators, each combination includes **3-4 unique variations**. Generate the same category and length multiple times to receive different content - no more repetitive placeholder text!

---

## 📦 Installation

### From VS Code Marketplace

1. Open **VS Code**
2. Go to Extensions (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Search for **"Multi-Language Lorem Ipsum"**
4. Click **Install**

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/multi-language-lorem.git
cd multi-language-lorem

# Install dependencies
npm install

# Compile
npm run compile

# Press F5 in VS Code to launch Extension Development Host
```

---

## 🚀 Usage

### Quick Start

1. **Place your cursor** where you want the text
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type `Lorem` and select a command
4. Choose **category** and **length**
5. Text is inserted instantly! ✨

### Available Commands

- `Lorem: Generate English Text`
- `Lorem: Generate Persian Text (فارسی)`
- `Lorem: Generate Arabic Text (العربية)`
- `Lorem: Generate Chinese Text (中文)`
- `Lorem: Generate Japanese Text (日本語)`
- `Lorem: Generate Russian Text (Русский)`
- `Lorem: Generate Spanish Text (Español)`
- `Lorem: Generate French Text (Français)`
- `Lorem: Generate German Text (Deutsch)`
- `Lorem: Generate Italian Text (Italiano)` ⭐ NEW
- `Lorem: Generate Portuguese Text (Português)` ⭐ NEW
- `Lorem: Generate Korean Text (한국어)` ⭐ NEW
- `Lorem: Generate Custom Text` - Full control over language, category, and length

### ⌨️ Keyboard Shortcuts

Boost your productivity with these default shortcuts:

- **`Ctrl+Alt+L`** (Mac: `Cmd+Alt+L`) - Open Custom Generator (choose language, category, length)
- **`Ctrl+Alt+Shift+E`** (Mac: `Cmd+Alt+Shift+E`) - Quick English Text

> 💡 **Tip:** You can customize these shortcuts in VS Code's Keyboard Shortcuts settings (`Ctrl+K Ctrl+S`)

### 💡 Pro Tips

- **Use keyboard shortcuts** for instant access to lorem generation
- **Generate multiple times** to get different variations
- **Mix languages** in multilingual projects
- **Use topic-specific content** for more realistic mockups
- **Try different categories** to match your project context
- **Customize shortcuts** to match your workflow

---

## 📖 Examples

### English - Technology (Short)

```
Innovative software solutions powering digital transformation across industries.
```

### Persian - Tourism (Medium)

```
سفری به یاد ماندنی را با بازدید از جاذبه‌های گردشگری بی‌نظیر تجربه کنید. از کوهستان‌های مرتفع تا سواحل زیبا، هر مقصد داستانی دارد. تورهای گردشگری ما با راهنمایان حرفه‌ای و برنامه‌ریزی دقیق، لحظات فراموش‌نشدنی را برای شما رقم می‌زنند.
```

### Arabic - Medical (Short)

```
حلول رعاية صحية متقدمة مع تكنولوجيا طبية حديثة وأطباء خبراء.
```

### Chinese - Business (Medium)

```
推动企业增长和卓越运营的战略咨询服务。我们经验丰富的顾问提供可行的见解、市场分析和转型路线图。我们与组织合作，释放价值并实现可持续的竞争优势。
```

### Spanish - Food (Long)

```
Creaciones culinarias exquisitas utilizando ingredientes frescos de origen local y recetas auténticas. Nuestros talentosos chefs elaboran platos excepcionales que celebran sabores diversos y tradiciones culinarias. Cada comida es un viaje a través del sabor, la textura y la excelencia en la presentación. Desde la frescura de la granja a la mesa hasta la cocina de fusión innovadora, deleitamos paladares exigentes con menús de temporada.
```

---

## 🏗️ Project Structure

```
multi-language-lorem/
├── src/
│   ├── extension.ts              # Main extension logic
│   ├── logo.png                  # Extension logo
│   └── lorem-data/               # Language data modules
│       ├── english.ts            # 🇬🇧 English lorem texts
│       ├── persian.ts            # 🇮🇷 Persian lorem texts
│       ├── arabic.ts             # 🇸🇦 Arabic lorem texts
│       ├── chinese.ts            # 🇨🇳 Chinese lorem texts
│       ├── japanese.ts           # 🇯🇵 Japanese lorem texts
│       ├── russian.ts            # 🇷🇺 Russian lorem texts
│       ├── spanish.ts            # 🇪🇸 Spanish lorem texts
│       ├── french.ts             # 🇫🇷 French lorem texts
│       └── german.ts             # 🇩🇪 German lorem texts
├── out/                          # Compiled JavaScript files
├── .vscode/
│   ├── launch.json               # Debug configuration
│   └── tasks.json                # Build tasks configuration
├── package.json                  # Extension manifest
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # This file
├── CHANGELOG.md                  # Version history
└── ARRAY_STRUCTURE_GUIDE.md      # Development guide
```

---

## 🛠️ Development

### Prerequisites

- **Node.js** 18.x or higher
- **VS Code** 1.85.0 or higher
- **TypeScript** 5.3 or higher

### Setup for Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in watch mode (auto-compile on changes)
npm run watch

# Run linter
npm run lint
```

### Testing

1. Open the project in VS Code
2. Press `F5` to launch Extension Development Host
3. Test commands in the new VS Code window
4. Check Debug Console for logs

### Adding New Languages

See `ARRAY_STRUCTURE_GUIDE.md` for detailed instructions on adding new languages.

Quick steps:

1. Create new file in `src/lorem-data/`
2. Export object with 6 categories
3. Each category has 3 arrays (short, medium, long)
4. Each array contains 3-4 text variations
5. Import and register in `extension.ts`

---

## 📊 Statistics

| Metric                        | Value |
| ----------------------------- | ----- |
| **Languages**                 | 9     |
| **Categories per Language**   | 6     |
| **Text Lengths**              | 3     |
| **Variations per Length**     | 3-4   |
| **Total Unique Combinations** | 162+  |
| **Total Different Texts**     | 450+  |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🌐 Adding More Languages

- Korean, Italian, Portuguese, Turkish, Hindi, etc.
- Follow existing structure in `src/lorem-data/`
- Provide professional, contextually accurate texts

### 📂 Adding More Categories

- Sports, Science, Art, Entertainment, Real Estate, etc.
- Maintain consistency across all languages

### 🐛 Reporting Issues

- Use [GitHub Issues](https://github.com/yourusername/multi-language-lorem/issues)
- Provide clear description and steps to reproduce

### 💡 Feature Requests

- Open a [Discussion](https://github.com/yourusername/multi-language-lorem/discussions)
- Explain the use case and benefits

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the need for realistic, multi-language placeholder text
- Built with ❤️ for the VS Code community
- Thanks to all contributors and users who help improve this extension

---

## 📧 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/multi-language-lorem/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/multi-language-lorem/discussions)
- **Email**: your.email@example.com

---

## 🔮 Roadmap

### v0.1.0 (Coming Soon)

- [ ] Marketplace publication
- [ ] Add Italian, Portuguese, Korean languages
- [ ] Custom keyboard shortcuts

### v0.2.0

- [ ] AI-powered dynamic text generation
- [ ] Custom text length (exact word/character count)
- [ ] Save favorite combinations

### v0.3.0

- [ ] Export/import custom templates
- [ ] Integration with popular frameworks
- [ ] VS Code snippets support

### Future

- [ ] More languages (20+ total)
- [ ] More categories (12+ total)
- [ ] API for external usage
- [ ] Community-contributed templates

---

## 📈 Changelog

### [0.0.1] - 2025-10-13

#### Added

- Initial release
- Support for 9 languages
- 6 topic-based categories
- 3 text length options
- Multiple variations per combination
- Modular architecture
- Random text selection
- Direct cursor insertion

---

<div align="center">

### ⭐ If you find this extension useful, please star the repository!

**Made with 💙 by developers, for developers**

[Report Bug](https://github.com/yourusername/multi-language-lorem/issues) • [Request Feature](https://github.com/yourusername/multi-language-lorem/issues) • [Give Feedback](https://github.com/yourusername/multi-language-lorem/discussions)

---

**Happy Coding! 🚀**

</div>
