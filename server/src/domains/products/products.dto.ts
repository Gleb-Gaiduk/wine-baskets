import {
  TPostProductRes,
  TProductProperty,
  TProductPropertyFromDb,
  TProductWithPropsFromDb,
} from './products.interface';
export class ProductFromDbDTO implements TPostProductRes {
  id: number;
  productName: string;
  productImageSrc: string;
  productPrice: string;
  productCategory: string;
  productProperties: TProductProperty[];

  constructor(model: TProductWithPropsFromDb) {
    this.id = model.id;
    this.productName = model.name;
    this.productImageSrc = model.image_path;
    this.productPrice = model.item_price;
    this.productCategory = model.category_name;
    this.productProperties = ProductFromDbDTO.transformPropertiesData(
      model.productProperties
    );
  }

  static transformPropertiesData(
    propertiesFromDb: TProductPropertyFromDb[]
  ): TProductProperty[] {
    return propertiesFromDb.map(property => ({
      propertyName: property.property_type,
      propertyValue: property.property_name,
      propertyDescription: property.property_description,
    }));
  }
}
