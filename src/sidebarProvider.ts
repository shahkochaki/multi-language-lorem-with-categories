import * as vscode from "vscode";
import { HistoryManager } from "./historyManager";
import { TemplateManager } from "./templateManager";

export class LoremSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "loremSidebar";
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private historyManager: HistoryManager,
    private templateManager: TemplateManager
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "generateLorem":
          vscode.commands.executeCommand("lorem.generateCustom");
          break;
        case "clearHistory":
          this.historyManager.clearHistory();
          this.refresh();
          break;
        case "copyToClipboard":
          vscode.env.clipboard.writeText(data.text);
          vscode.window.showInformationMessage("Text copied to clipboard!");
          break;
        case "insertText":
          this._insertTextAtCursor(data.text);
          break;
        case "deleteHistoryItem":
          this.historyManager.removeItem(data.id);
          this.refresh();
          break;
        case "deleteTemplate":
          this.templateManager.removeTemplate(data.id);
          this.refresh();
          break;
        case "useTemplate":
          const template = this.templateManager.getTemplate(data.id);
          if (template) {
            vscode.commands.executeCommand(
              "lorem.generateFromTemplate",
              template
            );
          }
          break;
      }
    });

    this.refresh();
  }

  private async _insertTextAtCursor(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      await editor.edit((editBuilder) => {
        editBuilder.insert(selection.active, text);
      });
      vscode.window.showInformationMessage("Text inserted!");
    }
  }

  public refresh() {
    if (this._view) {
      this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const history = this.historyManager.getHistory();
    const templates = this.templateManager.getTemplates();
    const stats = this.historyManager.getStats();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorem Ipsum Generator</title>
    <style>
        body {
            padding: 10px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
        }
        .section {
            margin-bottom: 20px;
        }
        h2 {
            font-size: 16px;
            margin-bottom: 10px;
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 5px;
        }
        button {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 2px;
            margin: 5px 5px 5px 0;
            font-size: 13px;
        }
        button:hover {
            background: var(--vscode-button-hoverBackground);
        }
        .history-item, .template-item {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 4px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        .item-meta {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
        }
        .item-text {
            font-size: 12px;
            margin: 8px 0;
            padding: 8px;
            background: var(--vscode-textCodeBlock-background);
            border-radius: 3px;
            max-height: 100px;
            overflow-y: auto;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .item-actions {
            display: flex;
            gap: 5px;
        }
        .item-actions button {
            padding: 4px 8px;
            font-size: 11px;
            margin: 0;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 10px;
        }
        .stat-card {
            background: var(--vscode-editor-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 10px;
            border-radius: 4px;
            text-align: center;
        }
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: var(--vscode-textLink-foreground);
        }
        .stat-label {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            margin-top: 4px;
        }
        .empty-state {
            text-align: center;
            padding: 20px;
            color: var(--vscode-descriptionForeground);
            font-size: 13px;
        }
        .primary-button {
            background: var(--vscode-button-background);
            width: 100%;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="section">
        <button class="primary-button" onclick="generateLorem()">🎲 Generate Lorem Text</button>
    </div>

    <div class="section">
        <h2>📊 Statistics</h2>
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${stats.total}</div>
                <div class="stat-label">Total Generated</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${templates.length}</div>
                <div class="stat-label">Templates Saved</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>⭐ Templates</h2>
        ${
          templates.length === 0
            ? '<div class="empty-state">No templates yet. Save your favorite configurations!</div>'
            : templates
                .map(
                  (template) => `
            <div class="template-item">
                <div class="item-header">
                    <strong>${template.name}</strong>
                    <span class="item-meta">${template.language}</span>
                </div>
                <div class="item-meta">
                    ${template.category} • ${template.length}
                </div>
                <div class="item-actions">
                    <button onclick="useTemplate('${template.id}')">Use</button>
                    <button onclick="deleteTemplate('${template.id}')">Delete</button>
                </div>
            </div>
        `
                )
                .join("")
        }
    </div>

    <div class="section">
        <h2>📜 History</h2>
        ${
          history.length > 0
            ? `<button onclick="clearHistory()">Clear All History</button>`
            : ""
        }
        ${
          history.length === 0
            ? '<div class="empty-state">No history yet. Generate some lorem text to see it here!</div>'
            : history
                .slice(0, 10)
                .map(
                  (item) => `
            <div class="history-item">
                <div class="item-header">
                    <span class="item-meta">${new Date(
                      item.timestamp
                    ).toLocaleString()}</span>
                    <span class="item-meta">${item.language}</span>
                </div>
                <div class="item-meta">
                    ${item.category} • ${item.length}
                </div>
                <div class="item-text">${item.text.substring(0, 150)}${
                    item.text.length > 150 ? "..." : ""
                  }</div>
                <div class="item-actions">
                    <button onclick="copyText('${item.id}', \`${item.text
                    .replace(/`/g, "\\`")
                    .replace(/\$/g, "\\$")}\`)">Copy</button>
                    <button onclick="insertText('${item.id}', \`${item.text
                    .replace(/`/g, "\\`")
                    .replace(/\$/g, "\\$")}\`)">Insert</button>
                    <button onclick="deleteHistoryItem('${
                      item.id
                    }')">Delete</button>
                </div>
            </div>
        `
                )
                .join("")
        }
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        function generateLorem() {
            vscode.postMessage({ type: 'generateLorem' });
        }

        function clearHistory() {
            if (confirm('Clear all history?')) {
                vscode.postMessage({ type: 'clearHistory' });
            }
        }

        function copyText(id, text) {
            vscode.postMessage({ type: 'copyToClipboard', id, text });
        }

        function insertText(id, text) {
            vscode.postMessage({ type: 'insertText', id, text });
        }

        function deleteHistoryItem(id) {
            vscode.postMessage({ type: 'deleteHistoryItem', id });
        }

        function deleteTemplate(id) {
            if (confirm('Delete this template?')) {
                vscode.postMessage({ type: 'deleteTemplate', id });
            }
        }

        function useTemplate(id) {
            vscode.postMessage({ type: 'useTemplate', id });
        }
    </script>
</body>
</html>`;
  }
}
