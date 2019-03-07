import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], searchtext: string, key: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchtext) {
            return items;
        }
        searchtext = searchtext.toLowerCase();
        return items.filter(el => {
            return el[key].toLowerCase().includes(searchtext);
        });
    }
}
