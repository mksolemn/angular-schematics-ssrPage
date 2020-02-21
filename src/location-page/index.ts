import {
    apply,
    chain, MergeStrategy,
    mergeWith, move,
    Rule, SchematicContext,
    template,
    Tree,
    url,

} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {Schema} from './schema';
import * as pages from '../schematics-pages.json';
import {buildDefaultPath, getProject, getWorkspace, parseName} from 'schematics-utilities';

interface PageData {
    name: string;
    meta: {
        title: string,
        description: string
    }
}

export class PaGen {
    constructor(private pages: PageData[],
                private _options: Schema,
                private _tree: Tree,
                private _context: SchematicContext) {
    }

    getPagesData(): PageData[] {
        return this.preFormatData((pages as any)['default']);
    }

    preFormatData(data: any[]): PageData[] {
        data.forEach(data => {
            data.name = this.formatName(data.name);
            data.meta.description = this.escapeQuotes(data.meta.description);
        });

        return data;
    }

    formatName(name: string): string {
        return name.replace(/[^A-Z0-9]+/ig, '-');
    }

    escapeQuotes(text: string): string {
        return text.replace(/'/g, '\\\'');
    }

    configureForProject() {
        const workspace = getWorkspace(this._tree);
        const projectName = this._options.project || Object.keys(workspace.projects)[0];
        const project = getProject(workspace, projectName);
        const path = this._options.path || buildDefaultPath(project as any);
        const parsedPath = parseName(path, this._options.name);
    }
}

export function paGen(_tree: Tree, _options: Schema, _context: SchematicContext): Rule {
    const paGen: PaGen = new PaGen(pages, _options, _tree, _context);
    const rules: Rule[] = [];

    paGen.getPagesData()
        .forEach(page => {

            if (page) {
                const sourceTemplates = url('./templates');
                const destTemplate = [template({...page, ...strings}), move('.')];
                const sourceParametrizedTemplates = apply(sourceTemplates, destTemplate);

                rules.push(mergeWith(sourceParametrizedTemplates, MergeStrategy.Overwrite));
                chain(rules);
                if (_tree.exists(destTemplate.values('path'))) {

                }
            }

        });

    return chain(rules);
}
