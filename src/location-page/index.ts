import {
    apply,
    chain, MergeStrategy,
    mergeWith, move,
    Rule, SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {Schema} from './schema';
import * as pages from '../ssr-pages.json';
import {workspace} from '@angular-devkit/core/src/experimental';
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
                private _options: Schema) {
    }

    getPagesData(): PageData[] {
        return (pages as any)['default'];
    }

    getSingleItemData(id: number) {
        this.pages[id].name = this.formatName(this.pages[id].name);
        return this.pages[id];
    }

    formatName(name: string) {
        return name.replace(/[^A-Z0-9]+/ig, '-');
    }

}

export function paGen(tree: Tree, _options: Schema, _context: SchematicContext): Rule {
    const paGen: PaGen = new PaGen(pages, _options);
    const rules: Rule[] = [];

    // const workspace = getWorkspace(tree);
    // const projectName = _options.project || Object.keys(workspace.projects)[0];
    // const project = getProject(workspace, projectName);
    // const path = _options.path || buildDefaultPath(project as any);
    // const parsedPath = parseName(path, _options.name);



    console.log('Total pages to generate: ', paGen.getPagesData().length);
    paGen.getPagesData()
        .forEach(page => {
            if (page) {
                page.name = paGen.formatName(page.name);
                const sourceTemplates = url('./templates');
                const sourceParametrizedTemplates = apply(sourceTemplates, [
                    template({
                        ...page,
                        ...strings
                    }), move('.')
                ]);
                rules.push(mergeWith(sourceParametrizedTemplates, MergeStrategy.Overwrite));
                chain(rules);
            }
        });

    return () => {
        return chain(rules);
    }
}
