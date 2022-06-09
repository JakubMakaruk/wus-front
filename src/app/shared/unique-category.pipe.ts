import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(value: any): any{
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'key');
    }
    return value;
  }

}
