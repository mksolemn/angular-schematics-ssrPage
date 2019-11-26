import {Component} from '@angular/core'
import {classify, dasherize} from '@angular-devkit/core/src/utils/strings';
@Component({
    selector: 'app-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component {
    name = '<%= name %>';
}
console.log('Hello <%= name %>');
