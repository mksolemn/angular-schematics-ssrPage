import {Component} from '@angular/core'

@Component({
    selector: 'srr-page-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component {
    name = '<%= name %>';
    title = '<%= meta.title %>';
    description = '<%= meta.description %>';
}
console.log('paGen <%= name %>');
