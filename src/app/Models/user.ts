
export interface CreateUser {
  email: string;
  password: string;
  organization?: string;
}

export interface User {
  uid: string;
  email: string;
  organization: string;
  photoName?: string;
  tempPhoto?: any;
  about?: string;
  website?:string;
  phone?:string;
  contactEmail?:string;

  registering?: boolean;

  otherServices?:string;
  services?: Services;
  hoursOfOperation?: Hours;
  hoursServingFood?: Hours;

  latLng?: LatLngPosition;
  // !! May need to break into pieces
  fullAddress?: string;
  lastUpdated?: number;
  bedCount?: number;

  pos?: object;
  
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

export interface Hours {
  monday: {open:string, close: string, isClosed:boolean};
  tuesday: {open:string, close: string, isClosed:boolean};
  wednesday: {open:string, close: string, isClosed:boolean};
  thursday: {open:string, close: string, isClosed:boolean};
  friday: {open:string, close: string, isClosed:boolean};
  saturday: {open:string, close: string, isClosed:boolean};
  sunday: {open:string, close: string, isClosed:boolean};
}