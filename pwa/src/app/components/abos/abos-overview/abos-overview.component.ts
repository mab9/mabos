import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {AbosListComponent} from "../abos-list/abos-list.component";
import {AbosStore} from "../../../stores/abos.store";
import {AbosDetailComponent} from "../abos-detail/abos-detail.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from "@angular/material/expansion";
import {MatGridTile} from "@angular/material/grid-list";
import {MatDivider} from "@angular/material/divider";
import {TagsEnum, TagsEnumColors} from "../../../model/tags.enum";
import {TagPipe} from "../../../pipes/tag.pipe";

@Component({
  selector: 'app-abos-overview',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon,
    NgIf,
    AbosListComponent,
    AsyncPipe,
    AbosDetailComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatGridTile,
    DecimalPipe,
    MatDivider,
    NgForOf,
    TagPipe
  ],
  templateUrl: './abos-overview.component.html',
  styleUrl: './abos-overview.component.scss'
})
export class AbosOverviewComponent {

  panelOpenState = false;
  panelOpenStateChart = false;
  tagsWithColors;
  constructor(
    public abosStore : AbosStore,
    ) {
    this.tagsWithColors = Object.entries(TagsEnum).map(([key, value]) => ({
      name: value,
      color: TagsEnumColors[key as keyof typeof TagsEnum]
    }));
  }

  protected readonly TagsEnum = TagsEnum;
  protected readonly TagsEnumColors = TagsEnumColors;
}
