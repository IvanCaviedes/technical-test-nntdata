import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class NttdataModule {
  constructor(@Optional() @SkipSelf() parentModule?: NttdataModule) {
    if (parentModule) {
      throw new Error(
        'NttdataModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
