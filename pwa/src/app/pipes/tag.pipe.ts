import { Pipe, PipeTransform } from '@angular/core';
import {TagsEnum} from "../model/tags.enum";

@Pipe({
  standalone: true,
  name: 'tag'
})
export class TagPipe implements PipeTransform {

  private readonly tagLabels: { [key in TagsEnum]?: string } = {
    [TagsEnum.HOUSING]: 'Housing',
    [TagsEnum.GROCERIES]: 'Groceries',
    [TagsEnum.MOBILITY]: 'Mobility',
    [TagsEnum.ENTERTAINMENT]: 'Entertainment',
    [TagsEnum.HEALTH]: 'Health',
    [TagsEnum.EDUCATION]: 'Education',
    [TagsEnum.INSURANCE]: 'Insurance',
    [TagsEnum.OTHER]: 'Other',
  };

  transform(value: string): string {
    return this.tagLabels[value as keyof typeof TagsEnum] ?? 'error';
  }
}
