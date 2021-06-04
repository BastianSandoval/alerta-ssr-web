import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { ComplaintDetailComponent } from './screens/complaint-detail/complaint-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { VisitorComponent } from './visitor.component';
import { DonateModalComponent } from './components/donate-modal/donate-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DesktopHomeScreenComponent } from './desktop-screen/desktop-home-screen/desktop-home-screen.component';
import { DesktopComplaintDetailScreenComponent } from './desktop-screen/desktop-complaint-detail-screen/desktop-complaint-detail-screen.component';
import { MobileHomeScreenComponent } from './mobile-screen/mobile-home-screen/mobile-home-screen.component';
import { MobileComplaintDetailScreenComponent } from './mobile-screen/mobile-complaint-detail-screen/mobile-complaint-detail-screen.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ComplaintDetailComponent, NavbarComponent, HomeScreenComponent, VisitorComponent, DonateModalComponent, FooterComponent, MapComponent, DesktopHomeScreenComponent, DesktopComplaintDetailScreenComponent, MobileHomeScreenComponent, MobileComplaintDetailScreenComponent],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCz0du8BFvXV2u4H8FeUWCLdmSwiSBy_cs'
  }),
    SharedModule
  ]
})
export class VisitorModule { }
