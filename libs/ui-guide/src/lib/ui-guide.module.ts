import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuideComponent } from './components/guide/guide.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GuideComponent],
  exports: [GuideComponent]
})
export class UiGuideModule {}
