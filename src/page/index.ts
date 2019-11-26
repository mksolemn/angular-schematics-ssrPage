import {apply, mergeWith, Rule, SchematicContext, template, Tree, url} from '@angular-devkit/schematics';
import {Schema} from './schema';
import {strings} from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function page(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./templates');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      })
    ]);
    return mergeWith(sourceParametrizedTemplates);
  };
}
