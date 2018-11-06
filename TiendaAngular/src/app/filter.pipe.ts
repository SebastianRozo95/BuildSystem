import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, search: any): any {
    if(search === undefined) return items;

    return items.filter(function(item){
      return item.nombre.toLowerCase().includes(search.toLowerCase());
    });
  }

}
