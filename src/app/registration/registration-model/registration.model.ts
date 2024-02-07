export interface Registration {
  First_name: string;
  Last_name: string;
  Email: string;
  DOB: number;
  Ph_num: number;
  Gender: string;
  Permanent_address: {
    Street: string;
    Country: string;
    City: string;
    Region: string;
    Postal_code: number;
  };
  isSameAsPermanent: boolean;
  Communication_address: {
    Street: string;
    Country: string;
    City: string;
    Region: string;
    Postal_code: number;
  };
  skill: string[];

}