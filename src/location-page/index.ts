import {
    apply,
    mergeWith,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {Schema} from './schema';
import {strings} from '@angular-devkit/core';

const ssrPageSrc = url('../../ssr-pages.json');

export function locationPage(_options: Schema): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const sourceTemplates = url('./templates/pages');
        const sourceParametrizedTemplates = apply(sourceTemplates, [
            template({
                ...ssrPageSrc,
                ..._options,
                ...strings
            })
        ]);
        return mergeWith(sourceParametrizedTemplates);
    };
}
