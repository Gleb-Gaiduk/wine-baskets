export type TProductPropertyTypeFromDb = {
  id: number;
  property_type: string;
};

export type TProductPropertyFromDb = {
  id: number;
  property_name: string;
  property_description: string | null;
  property_type_id: number;
};

export type TProductPropertiesParamsKeys = 'name' | 'productCategory';

export type TProductPropertiesParamsObject = {
  [key in TProductPropertiesParamsKeys]: string | number | boolean;
};

export type TCreatePropertiesForProduct = Array<
  Omit<TProductPropertyFromDb, 'property_type_id' | 'id'> & {
    property_type: string;
  }
>;
