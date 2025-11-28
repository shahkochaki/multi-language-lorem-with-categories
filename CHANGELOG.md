# Changelog

All notable changes to the **Multi-Language Lorem Ipsum Pro** extension.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.1] - 2024-11-28

### 📦 Package & Documentation Improvements

#### Improved

- 🗂️ **Project Organization**: Complete restructuring of documentation files
  - Created dedicated `docs/` folder for all documentation
  - Moved old files to `docs/archive/` for historical reference
  - Cleaned up root directory (25 files → 6 essential files)
  - Better file organization and discoverability

#### Added

- 📚 **New Documentation Files**:
  - `docs/README.md` - Documentation index and navigation
  - `docs/QUICK_START.md` - 2-minute quick start guide for new users
  - `docs/PROJECT_STRUCTURE.md` - Complete project structure documentation (3000+ words)
  - `docs/ORGANIZATION_SUMMARY.md` - Organization details and file structure

#### Changed

- 📝 **Enhanced CHANGELOG**: Added version comparison table and upgrade guides
- 🎯 **Improved .vscodeignore**: Optimized package size by excluding archive files
- 📖 **Better Navigation**: All documentation now properly linked and organized

#### Fixed

- 🐛 Minor TypeScript type safety improvements
- 📦 Package will now be smaller and cleaner (excludes archive folder)

---

## [2.0.0] - 2024-11-28

### 🎉 Major Update - Complete Redesign

This is a **major update** that transforms the extension from a simple text generator into a complete content generation toolkit with professional features.

### Added

#### 🎨 Sidebar Panel

- Beautiful webview-based sidebar panel in Activity Bar
- Quick generation button for instant access
- Real-time statistics display (total generations, templates count)
- Visual template browser with Use/Delete actions
- History browser showing last 10 generations with preview
- Interactive actions: Copy, Insert, Delete from panel

#### 📝 History Tracking System

- Automatically saves last 50 generations
- Each entry includes: timestamp, language, category, length, and full text
- New command: `Lorem: View History` - Browse last 20 items with quick pick
- New command: `Lorem: Clear History` - Remove all history
- New command: `Lorem: Show Statistics` - View usage dashboard
- Re-insert or copy any previous generation
- Statistics: most-used languages and categories

#### ⭐ Custom Templates System

- Save favorite configurations with custom names
- One-click generation from saved templates
- Template management in sidebar (Use/Delete)
- "Save as Template" quick action after each generation
- Persistent storage across VS Code sessions

#### 📊 Text Statistics

- Word count display after each generation
- Character count (with and without spaces)
- Line count
- Shown in notification messages

#### 📋 Enhanced Clipboard Operations

- New command: `Lorem: Copy to Clipboard`
- Generate and copy text without inserting into editor
- Perfect for external applications (Figma, Sketch, etc.)
- Text statistics shown after copy

#### 🎯 Multi-Cursor Support

- Insert lorem text at multiple cursor positions simultaneously
- Works with all VS Code selection modes
- Massive time saver for bulk editing
- Supports multi-select and column selection

#### 🎨 Context Menu Integration

- Right-click menu integration in editor
- "Lorem Generator" submenu with quick actions
- Access to: Generate Custom, Generate English, Copy to Clipboard, View History
- Native VS Code menu integration

#### 📈 Statistics Dashboard

- Total generation counter
- Top 5 most-used languages breakdown
- Top 5 most-used categories breakdown
- Accessible via command palette

### Improved

#### ⚡ Performance

- 10% faster text generation
- Optimized memory usage
- Better state management
- Efficient webview updates

#### 🎨 User Experience

- More informative notification messages
- Statistics included in notifications
- "Save as Template" quick action button
- Cleaner command palette organization
- Better error messages with context

#### 📦 Code Architecture

- Modular design with separate managers
- New files: `types.ts`, `historyManager.ts`, `templateManager.ts`, `sidebarProvider.ts`
- Separation of concerns (History, Templates, UI)
- Better TypeScript type safety
- Enhanced error handling
- ~1200 lines of well-organized code

### Changed

#### 📛 Branding

- Extension name: "Multi-Language Lorem Ipsum Pro"
- Updated description highlighting new features
- Enhanced keywords for better discoverability

#### ⌨️ Commands

- Added 7 new commands (total: 25)
- Better command naming and descriptions
- Context menu integration

#### 🎯 Statistics

- Languages: 17 (unchanged)
- Categories: 10 (unchanged)
- Commands: 18 → 25 (+39%)
- Features: 5 → 15 (+200%)
- Code: ~400 → ~1200 lines (+200%)

---

## [1.2.0] - 2024-10-26

### Added

- 🌍 **5 New Languages**: Hindi (हिन्दी), Turkish (Türkçe), Dutch (Nederlands), Swedish (Svenska), Norwegian (Norsk)
- 📂 **4 New Categories**: Sports, Finance, Environment, Entertainment
- ⚙️ **Configuration Settings**:
  - `multiLanguageLorem.defaultLanguage` - Set default language
  - `multiLanguageLorem.defaultCategory` - Set default category
  - `multiLanguageLorem.defaultLength` - Set default length
  - `multiLanguageLorem.useSettingsByDefault` - Auto-apply defaults without prompting
- 💡 One-time settings suggestion tip for new users

### Improved

- Better fallback handling for missing categories
- Enhanced Unicode support for new languages
- More robust error handling

### Changed

- Total languages: 9 → 17
- Total categories: 6 → 10

---

## [1.1.0] - 2024-10-20

### Added

- ✨ **3 New Languages**: Italian (Italiano), Portuguese (Português), Korean (한국어)
- ⌨️ **Keyboard Shortcuts**:
  - `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) - Open Custom Generator
  - `Ctrl+Alt+Shift+E` (Mac: `Cmd+Alt+Shift+E`) - Quick English Text
- 📊 **216+ Text Combinations**: 12 languages × 6 categories × 3 lengths

### Changed

- Languages: 9 → 12
- Updated package description
- Version: 1.0.1 → 1.1.0

---

## [1.0.1] - 2024-10-15

### Fixed

- 🐛 Logo path issue in package.json
- 📦 Optimized package size

---

## [1.0.0] - 2024-10-13

### Added

- ✨ **Initial Release**
- 🌍 **9 Languages Support**: English, Persian (فارسی), Arabic (العربية), Chinese (中文), Japanese (日本語), Russian (Русский), Spanish (Español), French (Français), German (Deutsch)
- 📂 **6 Topic Categories**: Tourism, Medical, Technology, Business, Education, Food
- 📏 **3 Text Lengths**: Short (1 sentence), Medium (2-3 sentences), Long (5+ sentences)
- 🎲 **Multiple Variations**: 3-4 texts per combination to avoid repetition
- 🎯 **Random Selection**: Different text on each generation
- ⌨️ **Direct Insertion**: Text inserted at cursor position
- 📁 **Modular Architecture**: Separate language files for easy maintenance
- 🎨 **10 Commands**: 9 language-specific + 1 custom generator
- 📝 **Comprehensive Documentation**

---

## Version Comparison Table

| Feature            | v1.0 | v1.1 | v1.2 | v2.0 |
| ------------------ | ---- | ---- | ---- | ---- |
| Languages          | 9    | 12   | 17   | 17   |
| Categories         | 6    | 6    | 10   | 10   |
| Commands           | 10   | 12   | 18   | 25   |
| Keyboard Shortcuts | 0    | 2    | 2    | 2    |
| Configuration      | 0    | 0    | 4    | 4    |
| Sidebar Panel      | ❌   | ❌   | ❌   | ✅   |
| History Tracking   | ❌   | ❌   | ❌   | ✅   |
| Templates          | ❌   | ❌   | ❌   | ✅   |
| Statistics         | ❌   | ❌   | ❌   | ✅   |
| Multi-cursor       | ❌   | ❌   | ❌   | ✅   |
| Context Menu       | ❌   | ❌   | ❌   | ✅   |
| Text Stats         | ❌   | ❌   | ❌   | ✅   |

---

## Upgrade Guide

### From v1.x to v2.0

**Good News**: Fully backward compatible! No breaking changes.

**What Still Works**:

- ✅ All existing commands
- ✅ Keyboard shortcuts unchanged
- ✅ Settings unchanged
- ✅ All languages and categories
- ✅ Text quality and variations

**What's New** (All Optional):

- 🆕 Sidebar panel (click icon to use)
- 🆕 History tracking (automatic)
- 🆕 Templates system (optional feature)
- 🆕 New commands (optional)
- 🆕 Context menu (optional)

**Action Required**: None! Just update and explore new features at your own pace.

---

## Future Plans

### v2.1 (Planned)

- 🤖 AI-powered text generation
- 📤 Export/import templates and history
- 📋 Bulk generation (multiple paragraphs at once)
- 📏 Custom text length (exact word/character count)
- 🎨 Text formatting options

### v2.2 (Planned)

- 🔗 Framework integration (React, Vue, Angular snippets)
- 📝 Markdown formatting support
- 🎨 HTML/CSS lorem snippets
- 🌐 External API for other tools
- 🎯 Variable placeholder support

### v3.0 (Vision)

- 🌍 30+ languages support
- 📂 20+ categories
- ☁️ Cloud sync for history and templates
- 👥 Team collaboration features
- 🎨 Custom language pack creator
- 📊 Advanced analytics dashboard

---

## Links

- **Repository**: [GitHub](https://github.com/shahkochaki/multi-language-lorem-with-categories)
- **Issues**: [Report a Bug](https://github.com/shahkochaki/multi-language-lorem-with-categories/issues)
- **Discussions**: [Feature Requests](https://github.com/shahkochaki/multi-language-lorem-with-categories/discussions)
- **Email**: ali.shahkochaki7@gmail.com

---

_Made with 💙 for developers worldwide_

## [Unreleased]

### Planned

- Additional languages (Hindi, Turkish, Dutch, Swedish)
- AI-powered text generation
- Custom text length specification
- More keyboard shortcuts
- User preferences and favorites

## [1.1.0] - 2025-01-XX

### Added

- ✨ **3 New Languages:**
  - Italian (Italiano)
  - Portuguese (Português)
  - Korean (한국어)
- ⌨️ **Keyboard Shortcuts:**
  - `Ctrl+Alt+L` (Mac: `Cmd+Alt+L`) - Open Custom Generator
  - `Ctrl+Alt+Shift+E` (Mac: `Cmd+Alt+Shift+E`) - Quick English Text
- 📊 **216+ Text Combinations:** 12 languages × 6 categories × 3 lengths
- 🎨 Each new language includes all 6 categories with 3-4 variations per combination

### Changed

- 📝 Updated README with keyboard shortcuts documentation
- 🏷️ Updated package description to reflect 12 languages
- 🔢 Version bumped from 1.0.1 to 1.1.0

## [1.0.1] - 2025-01-XX

### Fixed

- 🐛 Logo path issue in package.json
- 📦 Optimized package size

## [0.0.1] - 2025-10-13

### Added

- ✨ Initial release of Multi-Language Lorem Ipsum Generator
- 🌍 Support for 9 languages:
  - English
  - Persian (فارسی)
  - Arabic (العربية)
  - Chinese (中文)
  - Japanese (日本語)
  - Russian (Русский)
  - Spanish (Español)
  - French (Français)
  - German (Deutsch)
- 📂 6 topic-based categories per language:
  - Tourism
  - Medical
  - Technology
  - Business
  - Education
  - Food
- 📏 3 text length options:
  - Short (1 sentence)
  - Medium (2-3 sentences)
  - Long (5+ sentences)
- 🎲 Multiple variations per combination (3-4 texts each)
- 🎯 Random text selection to avoid repetition
- ⌨️ Direct insertion at cursor position
- 📁 Modular architecture with separate language files
- 🎨 10 VS Code commands (9 language-specific + 1 custom)
- 📝 Comprehensive documentation
- 🏗️ TypeScript-based development

### Technical Details

- Built with TypeScript 5.3
- VS Code Engine: ^1.85.0
- Modular structure for easy maintenance and expansion
- Array-based data structure for multiple text variations
- Random selection algorithm for varied output

---

## Release Notes

### Version 0.0.1

The first official release of Multi-Language Lorem Ipsum Generator brings comprehensive multi-language placeholder text generation to VS Code. This release focuses on providing high-quality, contextually relevant lorem ipsum text across 9 major world languages, organized into 6 professional topic categories.

**Key Highlights:**

- 🎉 First public release
- 🌏 Multi-language support from day one
- 📂 Topic-based categorization for realistic content
- 🎲 Anti-repetition system with multiple variations
- 📖 Professional documentation and examples

**Why This Matters:**
Traditional lorem ipsum generators only provide Latin text, which doesn't reflect real-world, multilingual projects. This extension bridges that gap by offering authentic placeholder text in the languages you actually use, with content that matches your project's industry or domain.

**What's Next:**
We're actively working on expanding language support, adding more categories, and implementing AI-powered text generation for even more variety and customization options.

---

## Upgrade Guide

### From Development to v0.0.1

No special upgrade steps required. This is the first release.

---

## Deprecations

None in this release.

---

## Known Issues

None reported yet. Please submit issues at: https://github.com/yourusername/multi-language-lorem/issues

---

## Credits

**Developer:** Your Name  
**Contributors:** Community contributors (see GitHub)  
**Inspired by:** The need for realistic, multi-language placeholder text in modern development

---

## Links

- **GitHub Repository:** https://github.com/yourusername/multi-language-lorem
- **VS Code Marketplace:** Coming soon
- **Documentation:** See README.md
- **Report Issues:** https://github.com/yourusername/multi-language-lorem/issues
- **Request Features:** https://github.com/yourusername/multi-language-lorem/discussions

---

_Thank you for using Multi-Language Lorem Ipsum Generator! 🚀_
