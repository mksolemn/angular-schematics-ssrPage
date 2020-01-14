import {Component} from '@angular/core'

@Component({
    selector: 'srr-page-<%= dasherize(name) %>',
    templateUrl: './<%= dasherize(name) %>.component.html',
    styleUrls: ['./<%= dasherize(name) %>.component.css']
})
export class <%= classify(name) %>Component {
    name = '<%= name %>';
}
console.log('paGen <%= name %>');
