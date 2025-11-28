import * as vscode from "vscode";

// Import lorem data from separate files
import { englishLorem } from "./lorem-data/english";
import { persianLorem } from "./lorem-data/persian";
import { arabicLorem } from "./lorem-data/arabic";
import { chineseLorem } from "./lorem-data/chinese";
import { japaneseLorem } from "./lorem-data/japanese";
import { russianLorem } from "./lorem-data/russian";
import { spanishLorem } from "./lorem-data/spanish";
import { frenchLorem } from "./lorem-data/french";
import { germanLorem } from "./lorem-data/german";
import { italianLorem } from "./lorem-data/italian";
import { portugueseLorem } from "./lorem-data/portuguese";
import { koreanLorem } from "./lorem-data/korean";
import { hindiLorem } from "./lorem-data/hindi";
import { turkishLorem } from "./lorem-data/turkish";
import { dutchLorem } from "./lorem-data/dutch";
import { swedishLorem } from "./lorem-data/swedish";
import { norwegianLorem } from "./lorem-data/norwegian";

// Import managers and providers
import { HistoryManager } from "./historyManager";
import { TemplateManager } from "./templateManager";
import { LoremSidebarProvider } from "./sidebarProvider";
import {
  LanguageKey,
  CategoryKey,
  LengthKey,
  Category,
  Length,
  CustomTemplate,
} from "./types";

// Language configuration
const loremData = {
  english: englishLorem,
  persian: persianLorem,
  arabic: arabicLorem,
  chinese: chineseLorem,
  japanese: japaneseLorem,
  russian: russianLorem,
  spanish: spanishLorem,
  french: frenchLorem,
  german: germanLorem,
  italian: italianLorem,
  portuguese: portugueseLorem,
  korean: koreanLorem,
  hindi: hindiLorem,
  turkish: turkishLorem,
  dutch: dutchLorem,
  swedish: swedishLorem,
  norwegian: norwegianLorem,
};

// Global managers
let historyManager: HistoryManager;
let templateManager: TemplateManager;
let sidebarProvider: LoremSidebarProvider;

const categories: Category[] = [
  { label: "🏖️ Tourism", value: "tourism", icon: "🏖️" },
  { label: "⚕️ Medical", value: "medical", icon: "⚕️" },
  { label: "💻 Technology", value: "technology", icon: "💻" },
  { label: "💼 Business", value: "business", icon: "💼" },
  { label: "📚 Education", value: "education", icon: "📚" },
  { label: "🍽️ Food", value: "food", icon: "🍽️" },
  { label: "🏅 Sports", value: "sports", icon: "🏅" },
  { label: "💹 Finance", value: "finance", icon: "💹" },
  { label: "🌱 Environment", value: "environment", icon: "🌱" },
  { label: "🎬 Entertainment", value: "entertainment", icon: "🎬" },
];

const lengths: Length[] = [
  { label: "Short (1 sentence)", value: "short" },
  { label: "Medium (2-3 sentences)", value: "medium" },
  { label: "Long (5+ sentences)", value: "long" },
];

// Show the settings suggestion at most once per extension host session
let settingsSuggestionShown = false;

async function insertTextAtCursor(text: string) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    // Support multiple cursors
    const selections = editor.selections;
    await editor.edit((editBuilder) => {
      selections.forEach((selection) => {
        editBuilder.insert(selection.active, text);
      });
    });
  }
}

function getTextStats(text: string) {
  const words = text.split(/\s+/).filter((w) => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const lines = text.split("\n").length;

  return { words, characters, charactersNoSpaces, lines };
}

async function generateLorem(
  language: LanguageKey,
  category?: CategoryKey,
  length?: LengthKey
) {
  try {
    // Read user configuration defaults
    const config = vscode.workspace.getConfiguration("multiLanguageLorem");
    const configuredDefaultCategory = config.get<string>("defaultCategory");
    const configuredDefaultLength = config.get<string>("defaultLength") as
      | LengthKey
      | undefined;
    const configuredDefaultLanguage = config.get<string>("defaultLanguage") as
      | LanguageKey
      | undefined;
    const useSettingsByDefault = config.get<boolean>(
      "useSettingsByDefault",
      false
    );

    // If language is not provided (defensive), and the user opted to use
    // settings by default, apply the configured default language if available.
    if (
      !language &&
      useSettingsByDefault &&
      configuredDefaultLanguage &&
      loremData[configuredDefaultLanguage]
    ) {
      // @ts-ignore - language is a parameter but we assign for fallback
      language = configuredDefaultLanguage;
    }

    // If category is not specified, and the user opted to use settings by
    // default, try configuration default first; otherwise we'll prompt below.
    if (!category && useSettingsByDefault && configuredDefaultCategory) {
      // If configured default exists for this language, use it
      const languageObjTmp: any = loremData[language] || {};
      if (languageObjTmp[configuredDefaultCategory]) {
        category = configuredDefaultCategory as CategoryKey;
      }
    }
    if (!category) {
      const selectedCategory = await vscode.window.showQuickPick(
        categories.map((c) => c.label),
        { placeHolder: "Select a category" }
      );

      if (!selectedCategory) {
        return; // User cancelled
      }

      const categoryObj = categories.find((c) => c.label === selectedCategory);
      category = categoryObj?.value || "tourism";
    }

    // If length is not specified, and the user opted to use settings by
    // default, apply configured default length; otherwise we'll prompt below.
    if (!length && useSettingsByDefault && configuredDefaultLength) {
      length = configuredDefaultLength;
    }

    // If the user hasn't set any of the extension defaults, show a one-time
    // suggestion offering to open settings. This is optional — we continue
    // with generation even if the user ignores/dismisses the message.
    try {
      if (!settingsSuggestionShown) {
        const inspect = (key: string) =>
          vscode.workspace.getConfiguration("multiLanguageLorem").inspect(key);

        const langInspect = inspect("defaultLanguage");
        const catInspect = inspect("defaultCategory");
        const lenInspect = inspect("defaultLength");

        const hasUserDefaults = !!(
          (langInspect &&
            (langInspect.globalValue !== undefined ||
              langInspect.workspaceValue !== undefined ||
              langInspect.workspaceFolderValue !== undefined)) ||
          (catInspect &&
            (catInspect.globalValue !== undefined ||
              catInspect.workspaceValue !== undefined ||
              catInspect.workspaceFolderValue !== undefined)) ||
          (lenInspect &&
            (lenInspect.globalValue !== undefined ||
              lenInspect.workspaceValue !== undefined ||
              lenInspect.workspaceFolderValue !== undefined))
        );

        if (!hasUserDefaults) {
          settingsSuggestionShown = true; // don't show repeatedly in this session
          vscode.window
            .showInformationMessage(
              "Tip: you can set default language, category and length for the Lorem generator in Settings.",
              "Open Settings",
              "Don't show again"
            )
            .then(
              (choice) => {
                if (choice === "Open Settings") {
                  // Open settings focused on our extension configuration
                  // Provide the configuration section so the settings UI focuses correctly
                  vscode.commands.executeCommand(
                    "workbench.action.openSettings",
                    "multiLanguageLorem"
                  );
                }
              },
              () => {
                /* ignore */
              }
            );
        }
      }
    } catch (e) {
      // Non-fatal: if inspect isn't available for some reason, just continue
    }

    if (!length) {
      const selectedLength = await vscode.window.showQuickPick(
        lengths.map((l) => l.label),
        { placeHolder: "Select text length" }
      );

      if (!selectedLength) {
        return; // User cancelled
      }

      const lengthObj = lengths.find((l) => l.label === selectedLength);
      length = lengthObj?.value || "medium";
    }

    // Resolve category existence for the selected language. If the chosen
    // category is missing for that language, fall back to the language's
    // first available category to avoid runtime errors.
    const languageObj: any = loremData[language] || {};
    if (!languageObj) {
      vscode.window.showErrorMessage(
        `No lorem data found for language: ${language}`
      );
      return;
    }

    if (!languageObj[category]) {
      const available = Object.keys(languageObj);
      const fallback =
        (available.length && (available[0] as CategoryKey)) || "tourism";
      vscode.window.showWarningMessage(
        `Category '${category}' not available for ${language}. Falling back to '${fallback}'.`
      );
      category = fallback as CategoryKey;
    }

    // Get the raw value and normalize to an array (some data files may store a single string)
    const raw = languageObj[category]
      ? languageObj[category][length]
      : undefined;
    const textArray: string[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

    if (!textArray.length) {
      vscode.window.showErrorMessage(
        `No texts available for ${language}/${category}/${length}`
      );
      return;
    }

    // Randomly select one text from the array
    const randomIndex = Math.floor(Math.random() * textArray.length);
    const text = textArray[randomIndex];

    await insertTextAtCursor(text);

    // Add to history
    if (historyManager) {
      await historyManager.addItem({
        language,
        category,
        length,
        text,
      });
      sidebarProvider?.refresh();
    }

    // Show stats
    const stats = getTextStats(text);
    const languageName = language.charAt(0).toUpperCase() + language.slice(1);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    const message = `${languageName} ${categoryName} inserted! (${
      randomIndex + 1
    }/${textArray.length}) | ${stats.words} words, ${stats.characters} chars`;

    vscode.window.showInformationMessage(message, "Save as Template").then(
      (selection) => {
        if (selection === "Save as Template" && category && length) {
          saveAsTemplate(language, category, length);
        }
      },
      () => {}
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate lorem text: ${error}`);
  }
}

async function saveAsTemplate(
  language: LanguageKey,
  category: CategoryKey,
  length: LengthKey
) {
  const name = await vscode.window.showInputBox({
    prompt: "Enter a name for this template",
    placeHolder: "e.g., My English Tourism Template",
  });

  if (name && templateManager) {
    await templateManager.addTemplate({
      name,
      language,
      category,
      length,
    });
    sidebarProvider?.refresh();
    vscode.window.showInformationMessage(`Template "${name}" saved!`);
  }
}

async function generateFromTemplate(template: CustomTemplate) {
  await generateLorem(template.language, template.category, template.length);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Multi-Language Lorem Ipsum extension is now active!");

  // Initialize managers
  historyManager = new HistoryManager(context);
  templateManager = new TemplateManager(context);

  // Register sidebar provider
  sidebarProvider = new LoremSidebarProvider(
    context.extensionUri,
    historyManager,
    templateManager
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      LoremSidebarProvider.viewType,
      sidebarProvider
    )
  );

  // Register commands for each language
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateEnglish", () =>
      generateLorem("english")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generatePersian", () =>
      generateLorem("persian")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateArabic", () =>
      generateLorem("arabic")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateChinese", () =>
      generateLorem("chinese")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateJapanese", () =>
      generateLorem("japanese")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateRussian", () =>
      generateLorem("russian")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateSpanish", () =>
      generateLorem("spanish")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateFrench", () =>
      generateLorem("french")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateGerman", () =>
      generateLorem("german")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateItalian", () =>
      generateLorem("italian")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generatePortuguese", () =>
      generateLorem("portuguese")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateKorean", () =>
      generateLorem("korean")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateHindi", () =>
      generateLorem("hindi")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateTurkish", () =>
      generateLorem("turkish")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateDutch", () =>
      generateLorem("dutch")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateSwedish", () =>
      generateLorem("swedish")
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateNorwegian", () =>
      generateLorem("norwegian")
    )
  );

  // Custom command to choose language, category, and length
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.generateCustom", async () => {
      const languages = Object.keys(loremData).map((lang) => ({
        label: lang.charAt(0).toUpperCase() + lang.slice(1),
        value: lang as LanguageKey,
      }));

      const selectedLanguage = await vscode.window.showQuickPick(
        languages.map((l) => l.label),
        { placeHolder: "Select a language" }
      );

      if (!selectedLanguage) {
        return;
      }

      const languageObj = languages.find((l) => l.label === selectedLanguage);
      if (languageObj) {
        await generateLorem(languageObj.value);
      }
    })
  );

  // Generate from template command
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "lorem.generateFromTemplate",
      async (template: CustomTemplate) => {
        await generateFromTemplate(template);
      }
    )
  );

  // Copy to clipboard command
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.copyToClipboard", async () => {
      const languages = Object.keys(loremData).map((lang) => ({
        label: lang.charAt(0).toUpperCase() + lang.slice(1),
        value: lang as LanguageKey,
      }));

      const selectedLanguage = await vscode.window.showQuickPick(
        languages.map((l) => l.label),
        { placeHolder: "Select a language" }
      );

      if (!selectedLanguage) {
        return;
      }

      const languageObj = languages.find((l) => l.label === selectedLanguage);
      if (!languageObj) {
        return;
      }

      const config = vscode.workspace.getConfiguration("multiLanguageLorem");
      const configuredDefaultCategory = config.get<string>("defaultCategory");
      const configuredDefaultLength = config.get<string>("defaultLength") as
        | LengthKey
        | undefined;
      const useSettingsByDefault = config.get<boolean>(
        "useSettingsByDefault",
        false
      );

      let category: CategoryKey | undefined;
      if (useSettingsByDefault && configuredDefaultCategory) {
        category = configuredDefaultCategory as CategoryKey;
      } else {
        const selectedCategory = await vscode.window.showQuickPick(
          categories.map((c) => c.label),
          { placeHolder: "Select a category" }
        );
        if (!selectedCategory) {
          return;
        }
        const categoryObj = categories.find(
          (c) => c.label === selectedCategory
        );
        category = categoryObj?.value || "tourism";
      }

      let length: LengthKey | undefined;
      if (useSettingsByDefault && configuredDefaultLength) {
        length = configuredDefaultLength;
      } else {
        const selectedLength = await vscode.window.showQuickPick(
          lengths.map((l) => l.label),
          { placeHolder: "Select text length" }
        );
        if (!selectedLength) {
          return;
        }
        const lengthObj = lengths.find((l) => l.label === selectedLength);
        length = lengthObj?.value || "medium";
      }

      const languageData: any = loremData[languageObj.value] || {};
      if (!languageData[category]) {
        vscode.window.showErrorMessage(
          `Category not available for ${languageObj.value}`
        );
        return;
      }

      const raw = languageData[category][length];
      const textArray: string[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

      if (!textArray.length) {
        vscode.window.showErrorMessage("No text available");
        return;
      }

      const randomIndex = Math.floor(Math.random() * textArray.length);
      const text = textArray[randomIndex];

      await vscode.env.clipboard.writeText(text);

      const stats = getTextStats(text);
      vscode.window.showInformationMessage(
        `Text copied to clipboard! ${stats.words} words, ${stats.characters} chars`
      );
    })
  );

  // View history command
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.viewHistory", async () => {
      const history = historyManager.getHistory();

      if (history.length === 0) {
        vscode.window.showInformationMessage("No history yet!");
        return;
      }

      const items = history.slice(0, 20).map((item) => ({
        label: `${item.language} - ${item.category} (${item.length})`,
        description: new Date(item.timestamp).toLocaleString(),
        detail: item.text.substring(0, 100) + "...",
        item,
      }));

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: "Select a history item to insert",
      });

      if (selected) {
        await insertTextAtCursor(selected.item.text);
        vscode.window.showInformationMessage("Text inserted from history!");
      }
    })
  );

  // Clear history command
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.clearHistory", async () => {
      const confirm = await vscode.window.showWarningMessage(
        "Clear all lorem generation history?",
        "Yes",
        "No"
      );

      if (confirm === "Yes") {
        await historyManager.clearHistory();
        sidebarProvider.refresh();
        vscode.window.showInformationMessage("History cleared!");
      }
    })
  );

  // Show stats command
  context.subscriptions.push(
    vscode.commands.registerCommand("lorem.showStats", () => {
      const stats = historyManager.getStats();

      const message = `
📊 Lorem Generation Statistics

Total generated: ${stats.total}

Top Languages:
${Object.entries(stats.languages)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .slice(0, 5)
  .map(([lang, count]) => `  • ${lang}: ${count}`)
  .join("\n")}

Top Categories:
${Object.entries(stats.categories)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .slice(0, 5)
  .map(([cat, count]) => `  • ${cat}: ${count}`)
  .join("\n")}
      `;

      vscode.window.showInformationMessage(message);
    })
  );
}

export function deactivate() {}
