import * as vscode from "vscode";
import { CustomTemplate } from "./types";

export class TemplateManager {
  private templates: CustomTemplate[] = [];
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.loadTemplates();
  }

  private loadTemplates() {
    const saved = this.context.globalState.get<CustomTemplate[]>(
      "loremTemplates",
      []
    );
    this.templates = saved;
  }

  private async saveTemplates() {
    await this.context.globalState.update("loremTemplates", this.templates);
  }

  async addTemplate(template: Omit<CustomTemplate, "id" | "created">) {
    const newTemplate: CustomTemplate = {
      ...template,
      id: `${Date.now()}-${Math.random()}`,
      created: Date.now(),
    };

    this.templates.push(newTemplate);
    await this.saveTemplates();
    return newTemplate;
  }

  getTemplates(): CustomTemplate[] {
    return [...this.templates];
  }

  async removeTemplate(id: string) {
    this.templates = this.templates.filter((t) => t.id !== id);
    await this.saveTemplates();
  }

  async updateTemplate(id: string, updates: Partial<CustomTemplate>) {
    const index = this.templates.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.templates[index] = { ...this.templates[index], ...updates };
      await this.saveTemplates();
    }
  }

  getTemplate(id: string): CustomTemplate | undefined {
    return this.templates.find((t) => t.id === id);
  }
}
