export interface CreateUser {
  email: string;
  password: string;
  organization?: string;
}

export interface User {
  uid: string;
  email: string;
  organization?: string;
  photoURL?: string;
  about?: string;
  website?:string;
  phone?:string;
  contactEmail?:string;

  otherServices?:string;
  services?: Services;
  
  latLng?: LatLngPosition;
  // !! May need to break into pieces
  fullAddress?: string;
  
}

export interface Services {
  beds:boolean;
  childcare:boolean;
  education:boolean;
  interviewPrep:boolean;
  jobPlacement:boolean;
  donations:boolean;
  servesFood:boolean;
}

export interface LatLngPosition {
  latitude:number;
  longitude:number;
}