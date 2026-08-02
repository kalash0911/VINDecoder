export interface DecodeVinResultItem {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}

export interface DecodeVinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: DecodeVinResultItem[];
}

export interface VehicleVariable {
  ID: number;
  Name: string;
  Description: string | null;
}

export interface VehicleVariableListResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleVariable[];
}

export interface VinEntry {
  vin: string;
  message: string;
  results: DecodeVinResultItem[];
  decodedAt: string;
}
