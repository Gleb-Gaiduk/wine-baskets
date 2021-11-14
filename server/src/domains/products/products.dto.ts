import { TPostProductRes, TProductProperty } from './products.interface';

type TPropertiesFromDb = {
  property_type: string;
  property_name: string;
  property_description: string | null;
}[];

type TTransformedProperties = {
  propertyName: string;
  propertyValue: string;
  propertyDescription: string | null;
}[];

export class ProductFromDbDTO implements TPostProductRes {
  id: number;
  productName: string;
  productImageSrc: string;
  productPrice: number;
  productCategory: string;
  productProperties: TProductProperty[];

  constructor(model) {
    this.id = model.id;
    this.productName = model.name;
    this.productImageSrc = model.image_path;
    this.productPrice = model.item_price;
    this.productCategory = model.productCategory;
    this.productProperties = ProductFromDbDTO.transformProductProperties(
      model.productProperties
    );
  }

  static transformProductProperties(
    properties: TPropertiesFromDb
  ): TTransformedProperties {
    return properties.map(property => ({
      propertyName: property.property_type,
      propertyValue: property.property_name,
      propertyDescription: property.property_description,
    }));
  }
}
