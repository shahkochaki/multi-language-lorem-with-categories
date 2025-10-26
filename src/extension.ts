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

type LanguageKey = keyof typeof loremData;
type CategoryKey =
  | "tourism"
  | "medical"
  | "technology"
  | "business"
  | "education"
  | "food"
  | "sports"
  | "finance"
  | "environment"
  | "entertainment";
type LengthKey = "short" | "medium" | "long";

interface Category {
  label: string;
  value: CategoryKey;
  icon: string;
}

interface Length {
  label: string;
  value: LengthKey;
}

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

async function insertTextAtCursor(text: string) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    await editor.edit((editBuilder) => {
      editBuilder.insert(selection.active, text);
    });
  }
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

    // If language is not provided (defensive), use configured default language
    if (
      !language &&
      configuredDefaultLanguage &&
      loremData[configuredDefaultLanguage]
    ) {
      // @ts-ignore - language is a parameter but we assign for fallback
      language = configuredDefaultLanguage;
    }
    // If category is not specified, try configuration default first, then ask the user
    if (!category && configuredDefaultCategory) {
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

    // If length is not specified, try configuration default then ask the user
    if (!length && configuredDefaultLength) {
      length = configuredDefaultLength;
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

    const languageName = language.charAt(0).toUpperCase() + language.slice(1);
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    vscode.window.showInformationMessage(
      `${languageName} ${categoryName} lorem text inserted! (${
        randomIndex + 1
      }/${textArray.length})`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate lorem text: ${error}`);
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Multi-Language Lorem Ipsum extension is now active!");

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
}

export function deactivate() {}
