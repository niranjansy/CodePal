import * as vscode from "vscode";
import { platform } from "os";
import * as fs from "fs";
import { Utils } from "../../utils/utils";
import { OS } from "../../utils/consts";

export const submitProblem = async (path: string) => {
    try {
        path = Utils.pathRefine(path, platform() === "win32"?OS.windows : OS.linuxMac);
        const jsonPath = path.substr(0, path.lastIndexOf("/")) + `/.problem.json`;
        const jsonData = JSON.parse(fs.readFileSync(jsonPath).toString());
        vscode.env.openExternal(vscode.Uri.parse(`https://codeforces.com/contest/${jsonData.contestID}/submit/${jsonData.index}`, true));
        vscode.window.showInformationMessage("Submit problem page opened");
    } catch (err) {
        vscode.window.showErrorMessage(err);
    }
};