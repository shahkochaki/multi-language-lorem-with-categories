import * as vscode from "vscode";
import { LoremHistoryItem } from "./types";

export class HistoryManager {
  private static readonly MAX_HISTORY = 50;
  private history: LoremHistoryItem[] = [];
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.loadHistory();
  }

  private loadHistory() {
    const saved = this.context.globalState.get<LoremHistoryItem[]>(
      "loremHistory",
      []
    );
    this.history = saved;
  }

  private async saveHistory() {
    await this.context.globalState.update("loremHistory", this.history);
  }

  async addItem(item: Omit<LoremHistoryItem, "id" | "timestamp">) {
    const historyItem: LoremHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    this.history.unshift(historyItem);

    // Keep only the last MAX_HISTORY items
    if (this.history.length > HistoryManager.MAX_HISTORY) {
      this.history = this.history.slice(0, HistoryManager.MAX_HISTORY);
    }

    await this.saveHistory();
  }

  getHistory(): LoremHistoryItem[] {
    return [...this.history];
  }

  async clearHistory() {
    this.history = [];
    await this.saveHistory();
  }

  async removeItem(id: string) {
    this.history = this.history.filter((item) => item.id !== id);
    await this.saveHistory();
  }

  getStats() {
    const languageCount = new Map<string, number>();
    const categoryCount = new Map<string, number>();

    this.history.forEach((item) => {
      languageCount.set(
        item.language,
        (languageCount.get(item.language) || 0) + 1
      );
      categoryCount.set(
        item.category,
        (categoryCount.get(item.category) || 0) + 1
      );
    });

    return {
      total: this.history.length,
      languages: Object.fromEntries(languageCount),
      categories: Object.fromEntries(categoryCount),
    };
  }
}
