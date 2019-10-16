import { Injectable } from '@angular/core';
import { ClipboardService } from "ngx-clipboard";


@Injectable({
  providedIn: 'root'
})
export class ClickFunctionsService {

  constructor(
    private clipboardService: ClipboardService
  ) { }



  visitWebsite(URL: string) {
    window.open(URL, "_blank");
  };

  openAddressInGoogleMaps(address: string) {
    const baseURL = "https://www.google.com/maps/dir/?api=1&destination=";
    const urlEncoded = encodeURI(address);
    const fullURL = baseURL + urlEncoded;

    window.open(fullURL, "_blank");
  };

  copyToClipboard(emailString: string) {
    this.clipboardService.copyFromContent(emailString);

  };


}
